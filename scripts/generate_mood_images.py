"""20作品のムード画像を Gemini API で生成するスクリプト"""

import os
import sys
import time
import base64
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

# Gemini API設定
API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = "gemini-2.0-flash-exp-image-generation"  # 画像生成対応モデル
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "manga"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 20作品の情報とムード画像プロンプト
MANGA_PROMPTS = {
    "one-piece": {
        "title": "ONE PIECE",
        "prompt": "A vast ocean at sunset with a pirate ship silhouette sailing toward adventure. Golden light reflecting on waves, dramatic clouds, sense of freedom and grand adventure. Dark cinematic atmosphere, no text, no characters.",
    },
    "jujutsu-kaisen": {
        "title": "呪術廻戦",
        "prompt": "Dark cursed energy swirling in an abandoned Japanese shrine at night. Purple and blue supernatural flames, eerie atmosphere, cracked walls with mysterious seals. Horror meets action aesthetic, no text, no characters.",
    },
    "chainsaw-man": {
        "title": "チェンソーマン",
        "prompt": "A dark urban cityscape at night with blood-red moon. Chainsaws and chains hanging from buildings, gritty punk rock aesthetic. Industrial horror atmosphere with neon signs. No text, no characters.",
    },
    "spy-family": {
        "title": "SPY×FAMILY",
        "prompt": "An elegant Cold War era European cityscape with spy thriller atmosphere. Art deco buildings, fog, streetlights casting warm glow, mysterious briefcase on a park bench. Sophisticated and warm. No text, no characters.",
    },
    "frieren": {
        "title": "葬送のフリーレン",
        "prompt": "A serene fantasy meadow with ancient ruins overgrown with flowers. Soft magical particles floating in golden afternoon light. Melancholic yet beautiful atmosphere, passage of time feeling. No text, no characters.",
    },
    "blue-lock": {
        "title": "ブルーロック",
        "prompt": "A futuristic soccer stadium interior with dramatic blue lighting. Geometric patterns on the field, intense competitive atmosphere, laser lights. Sports and technology fusion. No text, no characters.",
    },
    "oshi-no-ko": {
        "title": "【推しの子】",
        "prompt": "A glamorous entertainment stage with pink and purple spotlights. Star-shaped lights, idol concert atmosphere, but with underlying darkness in the shadows. Duality of fame and secrets. No text, no characters.",
    },
    "kingdom": {
        "title": "キングダム",
        "prompt": "An ancient Chinese battlefield at dawn. Thousands of war flags and spears rising from misty plains, Great Wall visible in distance. Epic historical warfare atmosphere, golden sunlight breaking through clouds. No text, no characters.",
    },
    "dandadan": {
        "title": "ダンダダン",
        "prompt": "A chaotic scene mixing UFO lights in the sky with traditional Japanese yokai fog on the ground. Neon green and orange energy bursts, surreal and fun atmosphere. Rural Japan meets sci-fi. No text, no characters.",
    },
    "sakamoto-days": {
        "title": "SAKAMOTO DAYS",
        "prompt": "A cozy Japanese convenience store at night with action movie atmosphere. Broken glass, bullet holes in walls but warm interior lighting. Contrast of peaceful daily life and combat. No text, no characters.",
    },
    "attack-on-titan": {
        "title": "進撃の巨人",
        "prompt": "Massive walls towering into cloudy sky, seen from below. Dark imposing atmosphere, crumbling stone architecture, mist and birds flying over the walls. Sense of confinement and yearning for freedom. No text, no characters.",
    },
    "demon-slayer": {
        "title": "鬼滅の刃",
        "prompt": "A traditional Japanese mountain forest at night with wisteria flowers glowing purple. Moonlight filtering through trees, water breathing patterns visible as blue mist. Beautiful yet dangerous atmosphere. No text, no characters.",
    },
    "my-hero-academia": {
        "title": "僕のヒーローアカデミア",
        "prompt": "A modern city skyline at dusk with superhero silhouettes on rooftops. Green lightning bolts in the sky, heroic atmosphere, comic book-style energy effects. Hopeful and powerful mood. No text, no characters.",
    },
    "hunter-x-hunter": {
        "title": "HUNTER×HUNTER",
        "prompt": "A mysterious world tree stretching infinitely into the sky, surrounded by exotic landscapes. Nen aura glowing in multiple colors, adventurous and dangerous atmosphere. Dark fantasy exploration. No text, no characters.",
    },
    "dragon-ball-super": {
        "title": "ドラゴンボール超",
        "prompt": "A cosmic tournament arena floating in space among galaxies. Energy beams of gold and blue crossing the void, multiple planets visible. Epic cosmic battle atmosphere with ki energy. No text, no characters.",
    },
    "naruto-boruto": {
        "title": "NARUTO/BORUTO",
        "prompt": "A hidden ninja village nestled in mountains with traditional Japanese architecture. Hokage rock faces carved in a cliff, cherry blossoms and kunai embedded in training posts. Ninja world atmosphere. No text, no characters.",
    },
    "death-note": {
        "title": "デスノート",
        "prompt": "A dark study room with a single desk lamp illuminating a black notebook. Red apple on the desk, chess pieces, gothic atmosphere. Intellectual thriller mood with heavy shadows. No text, no characters.",
    },
    "fullmetal-alchemist": {
        "title": "鋼の錬金術師",
        "prompt": "An alchemy transmutation circle glowing on a stone floor in a dimly lit laboratory. Steampunk-style machinery, books and vials, golden alchemical energy rising. Science meets magic atmosphere. No text, no characters.",
    },
    "tokyo-revengers": {
        "title": "東京リベンジャーズ",
        "prompt": "A Tokyo street scene at night with motorcycle gang aesthetic. Neon signs reflecting on wet pavement, leather jackets, vintage motorcycles parked. Japanese delinquent subculture atmosphere. No text, no characters.",
    },
    "one-punch-man": {
        "title": "ワンパンマン",
        "prompt": "A massive crater in the center of a destroyed city, single punch impact. Dramatic shockwave rings expanding outward, debris floating. Overwhelming power and comedic destruction contrast. No text, no characters.",
    },
}


def generate_image(slug: str, info: dict) -> bool:
    """Gemini APIで画像を生成"""
    from google import genai
    from google.genai import types

    output_path = OUTPUT_DIR / f"{slug}.jpg"
    if output_path.exists():
        print(f"  ⏭  {slug} — already exists, skipping")
        return True

    client = genai.Client(api_key=API_KEY)

    prompt = f"""Generate a cinematic, atmospheric mood image (16:9 aspect ratio, 1200x675 pixels).

Style: Dark, moody, cinematic lighting, high quality digital art, suitable for a manga review website banner.

Scene: {info['prompt']}

IMPORTANT: Do NOT include any text, letters, words, watermarks, or logos in the image. Pure visual art only."""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                ),
            )

            # 画像データを抽出
            for part in response.candidates[0].content.parts:
                if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                    img_data = part.inline_data.data
                    # PIL で JPG に変換・リサイズ
                    from PIL import Image
                    import io

                    img = Image.open(io.BytesIO(img_data))
                    img = img.convert("RGB")
                    # 1200x675にリサイズ
                    img = img.resize((1200, 675), Image.LANCZOS)
                    img.save(output_path, "JPEG", quality=85)
                    print(f"  ✅ {slug} — saved ({output_path.stat().st_size // 1024}KB)")
                    return True

            print(f"  ⚠️  {slug} — no image in response (attempt {attempt + 1})")
        except Exception as e:
            print(f"  ❌ {slug} — error (attempt {attempt + 1}): {e}")
            if "429" in str(e) or "quota" in str(e).lower():
                print("     Rate limited, waiting 30s...")
                time.sleep(30)
            else:
                time.sleep(5)

    return False


def main():
    print(f"🎨 ムード画像生成開始 ({len(MANGA_PROMPTS)}作品)")
    print(f"   出力先: {OUTPUT_DIR}\n")

    success = 0
    failed = []

    for i, (slug, info) in enumerate(MANGA_PROMPTS.items(), 1):
        print(f"[{i:2d}/{len(MANGA_PROMPTS)}] {info['title']} ({slug})")
        if generate_image(slug, info):
            success += 1
        else:
            failed.append(slug)

        # Rate limit対策: 5秒待機
        if i < len(MANGA_PROMPTS):
            time.sleep(5)

    print(f"\n📊 結果: {success}/{len(MANGA_PROMPTS)} 成功")
    if failed:
        print(f"❌ 失敗: {', '.join(failed)}")


if __name__ == "__main__":
    main()
