# Platform specs

Sizing and limits for every asset marketkit produces. Sizes are width×height in px. Check this reference before writing or generating any channel asset — an asset that misses its specs is not ready to publish. Specs drift; these are the working defaults. For a high-stakes or regulated campaign, verify against the platform's official requirements.

## Character limits

| Platform  | Limit per post/caption | Visible before truncation |
| --------- | ---------------------- | ------------------------- |
| X         | 280                    | 280                       |
| LinkedIn  | 3,000                  | ~200 (mobile less)        |
| Instagram | 2,200                  | ~125                      |
| Facebook  | 63,206                 | varies (~3–4 lines)       |
| TikTok    | 4,000                  | first line (~150)         |

Write the hook inside the visible window; the limit is a ceiling, not a target.

## Ad copy limits

| Placement        | Primary text            | Headline | Description |
| ---------------- | ----------------------- | -------- | ----------- |
| Meta (FB/IG)     | 125 visible (2,200 max) | 40       | 30          |
| LinkedIn ads     | 150 visible (600 max)   | 70       | 100         |
| X promoted posts | 280 (same as posts)     | —        | —           |

## Aspect ratios

| Ratio | Use                                            |
| ----- | ---------------------------------------------- |
| 1:1   | square feed posts                              |
| 4:5   | portrait feed posts — maximum feed real estate |
| 16:9  | landscape, link preview cards                  |
| 9:16  | full-screen: stories, reels, shorts, TikTok    |
| 2:3   | Pinterest pins                                 |

## Safe zones (9:16 assets, 1080×1920)

Keep text, logos, and CTAs out of roughly the top 250px and bottom 310px. UI chrome (usernames, captions, buttons) overlays that band on every platform and varies by app version. Land the message in the middle band.

## Image sizes

| Asset                   | Size      | Notes                             |
| ----------------------- | --------- | --------------------------------- |
| X in-feed image         | 1600×900  | 16:9; up to 4 images per post     |
| X link card             | 1200×628  | min 600×335                       |
| LinkedIn feed image     | 1200×1350 | 4:5; 1080×1080 also works         |
| LinkedIn link image     | 1200×627  |                                   |
| Instagram feed          | 1080×1350 | 4:5 preferred; 1080×1080 square   |
| Instagram Reels/Stories | 1080×1920 | 9:16; see safe zones              |
| Facebook link image     | 1200×630  |                                   |
| TikTok video/photo      | 1080×1920 | 9:16                              |
| YouTube thumbnail       | 1280×720  | ≤2MB                              |
| Pinterest pin           | 1000×1500 | 2:3; title ≤100, description ≤500 |

## Profile assets

Avatars and banners live in a different regime from feed assets: they are identity, they persist, and they crop.

| Platform          | Avatar                    | Banner/cover     | Crop notes                                                                                       |
| ----------------- | ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| X                 | 400×400                   | header 1500×500  | header crops tighter on mobile — keep the subject off the edges                                  |
| LinkedIn personal | 400×400                   | banner 1584×396  |                                                                                                  |
| LinkedIn company  | logo 300×300              | cover 1128×191   | cover is a narrow strip — no detail survives it                                                  |
| Instagram         | 320×320                   | —                | no banner                                                                                        |
| Facebook          | min 176×176, ship 720×720 | cover 851×315    | cover shows 820×312 desktop, 640×360 mobile — different crops of one image                       |
| TikTok            | 200×200                   | —                |                                                                                                  |
| YouTube           | 800×800                   | banner 2560×1440 | safe area 1546×423 — that band must carry the whole message (TV, desktop, mobile crop around it) |
| Pinterest         | 600×600                   | —                |                                                                                                  |

Design rules that apply to all of them:

1. **Every avatar renders as a circle.** Center the mark and design for the inscribed circle — anything in the corners is cropped away.
2. **Avatars must read at 32px.** They render tiny next to every post; a mark that needs detail to be recognizable fails. One shape, high contrast, no text that isn't a monogram.
3. **Banners crop per surface.** The same file renders at different crops on desktop, mobile, and TV. Keep the message inside the platform's safe area and treat the rest as bleed.
4. **Produce the pair together.** An avatar and banner for the same channel must read as one brand — same palette, same era of the logo. Mismatched identity assets look like a compromised account.

## Video specs

| Platform         | Resolution           | Length         | File            |
| ---------------- | -------------------- | -------------- | --------------- |
| X                | 1280×720 or 720×1280 | ≤2:20 standard | mp4/mov, ≤512MB |
| LinkedIn         | 256×144–4096×2304    | ≤10 min        | ≤5GB            |
| Instagram Reels  | 1080×1920            | ≤90 s standard | H.264 mp4       |
| Facebook feed    | 1280×720             | up to 240 min  | ≤4GB            |
| TikTok           | 1080×1920            | up to 10 min   | mp4/mov         |
| YouTube Shorts   | 1080×1920            | ≤3 min         | —               |
| YouTube standard | 16:9, 1080p+         | long-form      | —               |

## Carousels and multi-asset

- LinkedIn document posts (carousel): PDF, pages 1080×1350.
- Instagram carousel: up to 20 items, first image sets the crop.
- TikTok photo carousels: 1080×1920.
