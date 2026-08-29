import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { BUBBLE_COVER_WORKFLOWS, decodePngBase64, requestOrigin, safeCoverFilename } from "./coverUpload";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  cover: router({
    saveToBoardforms: publicProcedure
      .input(z.object({
        company: z.string().regex(/^\d+x\d+$/),
        filename: z.string().min(1).max(160),
        contents: z.string().min(100).max(16_000_000),
        bubbleEnvironment: z.enum(["test", "live"]),
      }))
      .mutation(async ({ ctx, input }) => {
        const png = decodePngBase64(input.contents);
        const filename = safeCoverFilename(input.filename);
        const stored = await storagePut(
          `cover-studio/${input.company}/${Date.now()}-${filename}`,
          png,
          "image/png",
        );
        const imageUrl = new URL(stored.url, requestOrigin(ctx.req.headers, ctx.req.protocol)).toString();
        const response = await fetch(BUBBLE_COVER_WORKFLOWS[input.bubbleEnvironment], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ company: input.company, cover: imageUrl }),
        });
        const bubbleResult = await response.json().catch(() => ({}));
        if (!response.ok || (bubbleResult?.status && bubbleResult.status !== "success")) {
          throw new Error(bubbleResult?.message || `Boardforms returned ${response.status}.`);
        }
        return { success: true as const, imageUrl, environment: input.bubbleEnvironment };
      }),
  }),

});

export type AppRouter = typeof appRouter;
