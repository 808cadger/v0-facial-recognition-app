import { generateText, Output } from "ai";
import { z } from "zod";

const skinAnalysisSchema = z.object({
  overallScore: z.number().describe("Overall skin health score from 0 to 100"),
  skinType: z.string().describe("Detected skin type: oily, dry, combination, normal, sensitive"),
  issues: z.array(
    z.object({
      name: z.string().describe("Name of the skin issue"),
      severity: z.enum(["mild", "moderate", "severe"]).describe("Severity level"),
      description: z.string().describe("Brief description of the issue"),
    })
  ).describe("List of detected skin issues"),
  foodRecommendations: z.array(
    z.object({
      food: z.string().describe("Name of the food"),
      benefit: z.string().describe("How this food helps the skin"),
    })
  ).describe("Foods that can improve the detected skin issues"),
  routineSteps: z.array(
    z.object({
      step: z.number().describe("Step number in the routine"),
      name: z.string().describe("Name of the routine step"),
      description: z.string().describe("How to perform this step"),
      timing: z.enum(["morning", "evening", "both"]).describe("When to do this step"),
    })
  ).describe("Recommended skincare routine steps"),
  productSuggestions: z.array(
    z.object({
      category: z.string().describe("Product category like cleanser, moisturizer, etc."),
      recommendation: z.string().describe("What type of product to look for"),
      ingredients: z.string().describe("Key ingredients to look for"),
    })
  ).describe("Product recommendations based on skin issues"),
  doctorAdvice: z.object({
    shouldVisit: z.boolean().describe("Whether the user should see a dermatologist"),
    urgency: z.enum(["none", "routine", "soon", "urgent"]).describe("How urgently they should visit"),
    reason: z.string().nullable().describe("Why they should visit a dermatologist"),
    specialistType: z.string().nullable().describe("What type of specialist to see"),
  }).describe("Whether the user should see a doctor"),
  generalTips: z.array(z.string()).describe("General lifestyle tips for better skin"),
});

export type SkinAnalysisResult = z.infer<typeof skinAnalysisSchema>;

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await generateText({
      model: "openai/gpt-4o",
      output: Output.object({ schema: skinAnalysisSchema }),
      messages: [
        {
          role: "system",
          content: `You are an expert AI dermatologist and skincare advisor. Analyze the provided facial image carefully and provide a comprehensive skin analysis. Be thorough but kind in your assessment. Focus on:
1. Identifying any visible skin issues (acne, dryness, wrinkles, dark spots, redness, etc.)
2. Determining skin type
3. Providing practical food recommendations that can help improve skin health
4. Creating a personalized skincare routine
5. Suggesting product categories and key ingredients
6. Advising whether they should see a dermatologist

Be specific and actionable in your recommendations. If the image is not a clear face photo, still provide general skincare advice based on what you can observe.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze my skin from this photo and provide detailed recommendations for food, skincare routine, product suggestions, and whether I should see a doctor.",
            },
            {
              type: "image",
              image: image,
            },
          ],
        },
      ],
    });

    return Response.json({ analysis: result.object });
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "Failed to analyze image. Please try again." },
      { status: 500 }
    );
  }
}
