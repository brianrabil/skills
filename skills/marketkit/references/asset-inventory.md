# Asset inventory

Every asset a campaign can need, in one list. Use it three ways: scope the campaign plan (to-campaign picks the set), generate the assets (to-posts, to-ads, to-email, to-images produce them), and verify coverage before publishing (to-checklist walks it). Dimensions and character limits live in the [platform specs](platform-specs.md); this file answers a different question — what must exist.

## Organic social

| Asset              | Channel                                           | Spec                                 | Produced by                   |
| ------------------ | ------------------------------------------------- | ------------------------------------ | ----------------------------- |
| Text post          | X, LinkedIn                                       | character limit per platform specs   | to-posts                      |
| Image post         | all                                               | image size per channel + caption     | to-posts + to-images          |
| Link post          | X, LinkedIn, FB                                   | link card image 1200×628/627         | to-posts + to-images          |
| Thread             | X                                                 | 2–7 posts, hook in post 1            | to-posts                      |
| Carousel           | IG (≤20 slides), LinkedIn (PDF 1080×1350), TikTok | per platform specs                   | to-posts + to-images          |
| Short video / reel | IG, TikTok, YT Shorts                             | 1080×1920, safe zones                | to-images (or note for shoot) |
| Story              | IG, FB                                            | 1080×1920, safe zones, ≤24h lifespan | to-images                     |

## Paid ads

| Asset                       | Channel        | Spec                                                           | Produced by    |
| --------------------------- | -------------- | -------------------------------------------------------------- | -------------- |
| Ad copy set                 | each placement | 3+ variants: primary text, headline, description per ad limits | to-ads         |
| Ad creative — feed          | each placement | 1080×1080 (1:1) and 1080×1350 (4:5)                            | to-images      |
| Ad creative — stories/reels | Meta, TikTok   | 1080×1920, safe zones                                          | to-images      |
| Destination URL             | all            | working landing page + UTM parameters per channel              | campaign owner |

## Identity (once per channel, on setup or rebrand)

| Asset          | Channel                  | Spec                         | Produced by |
| -------------- | ------------------------ | ---------------------------- | ----------- |
| Avatar         | all                      | circular crop, reads at 32px | to-images   |
| Banner / cover | X, LinkedIn, FB, YouTube | per profile assets table     | to-images   |

## Email

| Asset               | Channel | Spec                                              | Produced by |
| ------------------- | ------- | ------------------------------------------------- | ----------- |
| Email copy          | email   | subject <60, preheader complements, body, one CTA | to-email    |
| Header banner       | email   | ≤600px wide (1200×600 @2x), alt text required     | to-images   |
| Plain-text fallback | email   | mirrors the HTML message                          | to-email    |

## Web and share

| Asset                   | Channel           | Spec                             | Produced by    |
| ----------------------- | ----------------- | -------------------------------- | -------------- |
| Social share (OG) image | every linked page | 1200×630                         | to-images      |
| Landing page            | all               | matches the ad's promise and CTA | campaign owner |

## Documents marketkit itself produces

Campaign plan (to-campaign) → posts, ad copy, email copy, image manifest (to-posts, to-ads, to-email, to-images) → schedule (to-schedule) → publishing checklist (to-checklist).

## Minimum viable launch set

For the default channels (X, LinkedIn, Instagram, email):

- 3 organic posts per channel, each with an image sized for its channel
- 1 short video (Instagram Reel)
- 1 ad placement: 3 copy variants + 2 creatives (1:1 and 9:16)
- 1 email, subject + preheader + single CTA
- OG image for every page linked from any asset
- UTM-tagged destination URL per channel

Everything beyond this set is scale, not viability.
