/**
 * Baut Prompts für KI-Video-Dienste (Sora, Runway, Kling, Pika …).
 * Auf Englisch, weil die Video-Modelle damit die besten Ergebnisse liefern.
 * Wird vom Drehbuch-Generator (Prompt zum Kopieren) UND vom KI-Studio
 * (Video direkt auf der Seite erstellen) genutzt.
 */

export const BASE_LOOK =
  "Vertical 9:16 video, shot like authentic smartphone UGC content: natural daylight, slight handheld movement, realistic home environment, NO studio look, NO text overlays (text will be added later in editing), NO logos.";

export type AiScene = {
  seconds: number;
  description: string;
};

export function getAiScenes(styleId: string, productName: string, benefit: string): AiScene[] {
  const byStyle: Record<string, AiScene[]> = {
    "drei-gruende": [
      { seconds: 2, description: `Close-up of a hand holding the product "${productName}", presenting it to the camera in a bright living room.` },
      { seconds: 6, description: `The product "${productName}" being used in a real everyday situation, clearly showing its main benefit: ${benefit}.` },
      { seconds: 6, description: `Macro detail shot of the product "${productName}": material and mechanism, fingers interacting with it.` },
      { seconds: 6, description: `A satisfied person reacting positively while using the product "${productName}", casual and natural, no exaggerated acting.` },
      { seconds: 4, description: `Calm final shot of the product "${productName}" placed nicely on a table, soft morning light.` },
    ],
    "ehrlicher-test": [
      { seconds: 3, description: `A person holding a small shipping package, looking curious and slightly skeptical, about to unbox "${productName}".` },
      { seconds: 5, description: `Time-lapse style unboxing of "${productName}" on a wooden table, hands opening the package and revealing the product.` },
      { seconds: 7, description: `The product "${productName}" in real daily use over what feels like several days, showing: ${benefit}.` },
      { seconds: 5, description: `Honest close inspection of the product "${productName}", turning it around in the hands, checking quality.` },
      { seconds: 5, description: `The person nodding with a convinced, satisfied expression, the product "${productName}" visible in the foreground.` },
    ],
    "pov-story": [
      { seconds: 3, description: "An everyday frustrating situation at home, person mildly annoyed (relatable, slightly humorous, no product visible)." },
      { seconds: 5, description: "The everyday problem shown in close-up detail so viewers recognize themselves in it." },
      { seconds: 6, description: `The product "${productName}" enters the frame like a small discovery moment, warm lighting shift.` },
      { seconds: 7, description: `The same situation as before, but now relaxed and solved thanks to the product "${productName}": ${benefit}.` },
      { seconds: 4, description: `Content, happy end scene with the product "${productName}" casually placed in the environment.` },
    ],
    "problem-loesung": [
      { seconds: 3, description: "A common everyday problem shown big and clearly, with motion in the very first second (mild chaos or frustration, relatable)." },
      { seconds: 4, description: "Close-up that intensifies the everyday problem, annoyed facial expression." },
      { seconds: 6, description: `The product "${productName}" appears and is used immediately, hands clearly visible.` },
      { seconds: 8, description: `The wow moment - the product "${productName}" visibly solves the problem: ${benefit}. This is the hero shot, make it satisfying.` },
      { seconds: 4, description: `Relaxed final scene, person enjoying the result, the product "${productName}" clearly visible one more time.` },
    ],
  };

  return byStyle[styleId] ?? byStyle["problem-loesung"];
}

/** Kompletter Prompt (alle Szenen) – zum Kopieren in externe KI-Tools. */
export function buildAiPrompt(styleId: string, productName: string, benefit: string): string {
  const scenes = getAiScenes(styleId, productName, benefit);
  return [
    `Create a realistic short product advertisement video for "${productName}".`,
    `${BASE_LOOK} Total length ~20-25 seconds.`,
    "",
    ...scenes.map((s, i) => `Scene ${i + 1} (${s.seconds}s): ${s.description}`),
    "",
    "Consistent person, home and lighting across all scenes. The result should feel like a genuine recommendation filmed by a real customer, not like a commercial.",
  ].join("\n");
}

/**
 * Prompt für EINE einzelne Szene – fürs KI-Studio.
 * Video-KIs erzeugen 5–10-Sekunden-Clips; ein Werbevideo entsteht aus
 * mehreren Szenen, die anschliessend (z. B. in CapCut) zusammengefügt werden.
 */
export function buildScenePrompt(scene: AiScene): string {
  return `One continuous shot for a product advertisement. ${scene.description} ${BASE_LOOK} The result should feel like a genuine video filmed by a real customer, not like a commercial.`;
}
