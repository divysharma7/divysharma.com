# Data Events — GTM + GA4 Setup Guide

Complete setup guide for Google Tag Manager (`GTM-P9B75L4Z`) and GA4 (`G-5KLWWQ8D8V`) on divysharma.com.

---

## Part 1: Connect GA4 to GTM

The old standalone `gtag.js` was removed from `index.html`. GA4 now lives inside GTM as a tag.

### Step 1 — Create the GA4 Configuration Tag

1. Go to **tagmanager.google.com** → open container `GTM-P9B75L4Z`
2. **Tags** → **New**
3. Tag name: `GA4 — Configuration`
4. Tag type: **Google Analytics: GA4 Configuration** (older GTM UI) or **Google Tag** (newer UI)
5. Measurement ID: `G-5KLWWQ8D8V`
6. Under **Configuration Settings**, check **Send a page view event when this configuration loads** → set to **false** (page views are handled manually for SPA)
7. Trigger: **All Pages** (the built-in one)
8. Save

This loads the GA4 library on every page. It does NOT send page views — that happens next.

---

## Part 2: SPA Page View Tracking

The code in `main.js` pushes this on every route change:

```js
window.dataLayer.push({
  event: 'page_view',
  page_path: '/blog/some-post',
  page_title: 'Some Post | Divy Sharma'
})
```

GTM needs a trigger and tag to catch this.

### Step 2a — Create Data Layer Variables

1. **Variables** → **User-Defined Variables** → **New**
2. Name: `dlv — page_path`
3. Type: **Data Layer Variable**
4. Data Layer Variable Name: `page_path`
5. Save

Repeat for:

| Variable Name       | Data Layer Variable Name |
| ------------------- | ------------------------ |
| `dlv — page_path`   | `page_path`              |
| `dlv — page_title`  | `page_title`             |

### Step 2b — Create the Custom Event Trigger

1. **Triggers** → **New**
2. Name: `CE — page_view`
3. Type: **Custom Event**
4. Event name: `page_view`
5. Save

### Step 2c — Create the GA4 Page View Tag

1. **Tags** → **New**
2. Name: `GA4 — Event — Page View — SPA`
3. Tag type: **Google Analytics: GA4 Event**
4. Configuration Tag: select `GA4 — Configuration` (from Step 1)
5. Event Name: `page_view`
6. Event Parameters:
   - `page_path` → `{{dlv — page_path}}`
   - `page_title` → `{{dlv — page_title}}`
7. Trigger: `CE — page_view` (from Step 2b)
8. Save

---

## Part 3: All Custom Event Tags

Every `dataLayer.push()` in the codebase uses this pattern:

```js
window.dataLayer.push({ event: 'click:nav', link_url: '/projects', nav_type: 'desktop' })
```

GTM catches the `event` value as a Custom Event trigger. The other keys become Data Layer Variables.

### Step 3a — Create All Data Layer Variables

| Variable Name          | Data Layer Variable Name | Used by events                             |
| ---------------------- | ------------------------ | ------------------------------------------ |
| `dlv — link_url`       | `link_url`               | `click:nav`                                |
| `dlv — nav_type`       | `nav_type`               | `click:nav`                                |
| `dlv — action`         | `action`                 | `click:mobile_menu`, `chat:toggle`         |
| `dlv — platform`       | `platform`               | `click:social`, `click:outbound`           |
| `dlv — location`       | `location`               | most click events                          |
| `dlv — post_title`     | `post_title`             | `click:blog_card`, `click:blog_post`       |
| `dlv — post_slug`      | `post_slug`              | all blog events                            |
| `dlv — position`       | `position`               | `click:blog_post`                          |
| `dlv — project_name`   | `project_name`           | `click:project_open`                       |
| `dlv — link_type`      | `link_type`              | `click:project_open`                       |
| `dlv — link_href`      | `link_href`              | `click:project_outbound`                   |
| `dlv — project_id`     | `project_id`             | `click:project_outbound`                   |
| `dlv — card`           | `card`                   | `click:explore_card`                       |
| `dlv — destination`    | `destination`            | `click:explore_card`                       |
| `dlv — section`        | `section`                | `click:view_all`                           |
| `dlv — search_query`   | `search_query`           | `blog:search`, `books:search`              |
| `dlv — tag_name`       | `tag_name`               | `blog:filter_tag`, `blog:tag_click`        |
| `dlv — section_id`     | `section_id`             | `blog:toc_click`                           |
| `dlv — from_slug`      | `from_slug`              | `click:related_post`                       |
| `dlv — to_slug`        | `to_slug`                | `click:related_post`                       |
| `dlv — to_title`       | `to_title`               | `click:related_post`                       |
| `dlv — category`       | `category`               | `mentors:filter`                           |
| `dlv — hidden_count`   | `hidden_count`           | `mentors:show_more`                        |
| `dlv — sticker_id`     | `sticker_id`             | `journey:sticker_place/reposition`         |
| `dlv — method`         | `method`                 | `journey:sticker_place`                    |
| `dlv — is_suggestion`  | `is_suggestion`          | `chat:message_sent`                        |
| `dlv — status`         | `status`                 | `books:filter_status`                      |
| `dlv — filter_key`     | `filter_key`             | `books:filter_quick`                       |
| `dlv — book_title`     | `book_title`             | `books:status_change`                      |
| `dlv — new_status`     | `new_status`             | `books:status_change`                      |
| `dlv — sort`           | `sort`                   | `books:filter_apply`                       |
| `dlv — status_count`   | `status_count`           | `books:filter_apply`                       |
| `dlv — tag_count`      | `tag_count`              | `books:filter_apply`                       |
| `dlv — apm`            | `apm`                    | `books:filter_apply`                       |
| `dlv — error_type`     | `error_type`             | `contact:form_error`                       |
| `dlv — source`         | `source`                 | `blog:tag_click`                           |

Each one: **Variables** → **New** → Type: **Data Layer Variable** → paste the variable name → Save.

### Step 3b — Create Custom Event Triggers

For each unique event name, create a trigger:

| Trigger Name                      | Event Name                  |
| --------------------------------- | --------------------------- |
| `CE — click:nav`                  | `click:nav`                 |
| `CE — click:mobile_menu`          | `click:mobile_menu`         |
| `CE — click:resume_download`      | `click:resume_download`     |
| `CE — click:social`               | `click:social`              |
| `CE — click:blog_card`            | `click:blog_card`           |
| `CE — click:blog_post`            | `click:blog_post`           |
| `CE — click:view_all`             | `click:view_all`            |
| `CE — click:outbound`             | `click:outbound`            |
| `CE — click:project_open`         | `click:project_open`        |
| `CE — click:project_outbound`     | `click:project_outbound`    |
| `CE — click:explore_card`         | `click:explore_card`        |
| `CE — click:related_post`         | `click:related_post`        |
| `CE — blog:search`                | `blog:search`               |
| `CE — blog:filter_tag`            | `blog:filter_tag`           |
| `CE — blog:share_open`            | `blog:share_open`           |
| `CE — blog:copy_link`             | `blog:copy_link`            |
| `CE — blog:share`                 | `blog:share`                |
| `CE — blog:toc_click`             | `blog:toc_click`            |
| `CE — blog:tag_click`             | `blog:tag_click`            |
| `CE — books:search`               | `books:search`              |
| `CE — books:filter_open`          | `books:filter_open`         |
| `CE — books:filter_status`        | `books:filter_status`       |
| `CE — books:filter_quick`         | `books:filter_quick`        |
| `CE — books:filter_apply`         | `books:filter_apply`        |
| `CE — books:clear_filters`        | `books:clear_filters`       |
| `CE — books:status_change`        | `books:status_change`       |
| `CE — cta:book_call`              | `cta:book_call`             |
| `CE — cta:booking_close`          | `cta:booking_close`         |
| `CE — contact:message_sent`       | `contact:message_sent`      |
| `CE — contact:form_error`         | `contact:form_error`        |
| `CE — chat:toggle`                | `chat:toggle`               |
| `CE — chat:message_sent`          | `chat:message_sent`         |
| `CE — mentors:filter`             | `mentors:filter`            |
| `CE — mentors:show_more`          | `mentors:show_more`         |
| `CE — journey:sticker_place`      | `journey:sticker_place`     |
| `CE — journey:sticker_reposition` | `journey:sticker_reposition`|

Each: **Triggers** → **New** → Type: **Custom Event** → paste event name → Save.

### Step 3c — Create GA4 Event Tags

For each event, create a tag that sends it to GA4 with the relevant parameters.

| Tag Name                          | Event Name                  | Parameters (variable → DL var)                           | Trigger                           |
| --------------------------------- | --------------------------- | -------------------------------------------------------- | --------------------------------- |
| `GA4 — click:nav`                 | `click:nav`                 | `link_url`, `nav_type`                                   | `CE — click:nav`                  |
| `GA4 — click:mobile_menu`         | `click:mobile_menu`         | `action`                                                 | `CE — click:mobile_menu`          |
| `GA4 — click:resume_download`     | `click:resume_download`     | `location`                                               | `CE — click:resume_download`      |
| `GA4 — click:social`              | `click:social`              | `platform`, `location`                                   | `CE — click:social`               |
| `GA4 — click:blog_card`           | `click:blog_card`           | `post_title`, `post_slug`, `location`                    | `CE — click:blog_card`            |
| `GA4 — click:blog_post`           | `click:blog_post`           | `post_title`, `post_slug`, `position`                    | `CE — click:blog_post`            |
| `GA4 — click:view_all`            | `click:view_all`            | `section`                                                | `CE — click:view_all`             |
| `GA4 — click:outbound`            | `click:outbound`            | `platform`, `location`                                   | `CE — click:outbound`             |
| `GA4 — click:project_open`        | `click:project_open`        | `project_name`, `link_type`                              | `CE — click:project_open`         |
| `GA4 — click:project_outbound`    | `click:project_outbound`    | `project_id`, `link_href`                                | `CE — click:project_outbound`     |
| `GA4 — click:explore_card`        | `click:explore_card`        | `card`, `destination`                                    | `CE — click:explore_card`         |
| `GA4 — click:related_post`        | `click:related_post`        | `from_slug`, `to_slug`, `to_title`                       | `CE — click:related_post`         |
| `GA4 — blog:search`               | `blog:search`               | `search_query`                                           | `CE — blog:search`                |
| `GA4 — blog:filter_tag`           | `blog:filter_tag`           | `tag_name`                                               | `CE — blog:filter_tag`            |
| `GA4 — blog:share_open`           | `blog:share_open`           | `post_slug`                                              | `CE — blog:share_open`            |
| `GA4 — blog:copy_link`            | `blog:copy_link`            | `post_slug`                                              | `CE — blog:copy_link`             |
| `GA4 — blog:share`                | `blog:share`                | `post_slug`, `platform`                                  | `CE — blog:share`                 |
| `GA4 — blog:toc_click`            | `blog:toc_click`            | `post_slug`, `section_id`                                | `CE — blog:toc_click`             |
| `GA4 — blog:tag_click`            | `blog:tag_click`            | `tag_name`, `source`                                     | `CE — blog:tag_click`             |
| `GA4 — books:search`              | `books:search`              | `search_query`                                           | `CE — books:search`               |
| `GA4 — books:filter_open`         | `books:filter_open`         | *(none)*                                                 | `CE — books:filter_open`          |
| `GA4 — books:filter_status`       | `books:filter_status`       | `status`                                                 | `CE — books:filter_status`        |
| `GA4 — books:filter_quick`        | `books:filter_quick`        | `filter_key`                                             | `CE — books:filter_quick`         |
| `GA4 — books:filter_apply`        | `books:filter_apply`        | `sort`, `status_count`, `tag_count`, `apm`               | `CE — books:filter_apply`         |
| `GA4 — books:clear_filters`       | `books:clear_filters`       | *(none)*                                                 | `CE — books:clear_filters`        |
| `GA4 — books:status_change`       | `books:status_change`       | `book_title`, `new_status`                               | `CE — books:status_change`        |
| `GA4 — cta:book_call`             | `cta:book_call`             | `location`                                               | `CE — cta:book_call`              |
| `GA4 — cta:booking_close`         | `cta:booking_close`         | *(none)*                                                 | `CE — cta:booking_close`          |
| `GA4 — contact:message_sent`      | `contact:message_sent`      | `location`                                               | `CE — contact:message_sent`       |
| `GA4 — contact:form_error`        | `contact:form_error`        | `error_type`                                             | `CE — contact:form_error`         |
| `GA4 — chat:toggle`               | `chat:toggle`               | `action`                                                 | `CE — chat:toggle`                |
| `GA4 — chat:message_sent`         | `chat:message_sent`         | `is_suggestion`                                          | `CE — chat:message_sent`          |
| `GA4 — mentors:filter`            | `mentors:filter`            | `category`                                               | `CE — mentors:filter`             |
| `GA4 — mentors:show_more`         | `mentors:show_more`         | `hidden_count`                                           | `CE — mentors:show_more`          |
| `GA4 — journey:sticker_place`     | `journey:sticker_place`     | `sticker_id`, `method`                                   | `CE — journey:sticker_place`      |
| `GA4 — journey:sticker_reposition`| `journey:sticker_reposition`| `sticker_id`                                             | `CE — journey:sticker_reposition` |

Each tag: **Tags** → **New** → Type: **Google Analytics: GA4 Event** → Configuration Tag: `GA4 — Configuration` → Event Name: (from table) → Add Event Parameters (from table, using the `dlv —` variables) → Trigger: (from table) → Save.

---

## Part 4: Built-in GTM Triggers (No Code Needed)

These use GTM's native trigger types — no `dataLayer.push()` required from the codebase.

### Scroll Depth (all pages)

1. **Variables** → **Built-In Variables** → enable **Scroll Depth Threshold** and **Page Path**
2. Create trigger: **Triggers** → **New** → Type: **Scroll Depth**
   - Name: `Scroll — 25/50/75/100`
   - Vertical Scroll Depths: Percentages → `25, 50, 75, 100`
3. Create tag:
   - Name: `GA4 — scroll:depth`
   - Event: `scroll:depth`
   - Parameters: `depth` → `{{Scroll Depth Threshold}}`, `page_path` → `{{Page Path}}`
   - Trigger: the scroll trigger above

### Timer — Blog Detail (30s, 60s, 2min)

Create 3 timer triggers, each firing once:

| Trigger Name            | Interval (ms) | Limit | Condition                      |
| ----------------------- | -------------- | ----- | ------------------------------ |
| `Timer — 30s on blog`   | `30000`        | `1`   | Page Path contains `/blog/`    |
| `Timer — 60s on blog`   | `60000`        | `1`   | Page Path contains `/blog/`    |
| `Timer — 120s on blog`  | `120000`       | `1`   | Page Path contains `/blog/`    |

Create one tag per timer:

| Tag Name                    | Event                      | Parameters    | Trigger           |
| --------------------------- | -------------------------- | ------------- | ----------------- |
| `GA4 — blog:time 30s`       | `engagement:time_milestone` | `seconds: 30`  | `Timer — 30s`     |
| `GA4 — blog:time 60s`       | `engagement:time_milestone` | `seconds: 60`  | `Timer — 60s`     |
| `GA4 — blog:time 120s`      | `engagement:time_milestone` | `seconds: 120` | `Timer — 120s`    |

### Element Visibility

| Trigger Name              | Type               | CSS Selector     | Min % Visible | Once per page |
| ------------------------- | ------------------ | ---------------- | ------------- | ------------- |
| `Visible — CTA Card`      | Element Visibility | `.cta-card`      | 50%           | Yes           |
| `Visible — Contact Form`  | Element Visibility | `.contact-form`  | 50%           | Yes           |
| `Visible — Blog Post Body`| Element Visibility | `.post-body`     | 25%           | Yes           |

| Tag Name                    | Event                | Parameters   | Trigger                    |
| --------------------------- | -------------------- | ------------ | -------------------------- |
| `GA4 — view:cta`            | `view:cta`           | `page_path`  | `Visible — CTA Card`       |
| `GA4 — view:contact_form`   | `view:contact_form`  | `page_path`  | `Visible — Contact Form`   |
| `GA4 — view:blog_body`      | `view:blog_body`     | `page_path`  | `Visible — Blog Post Body` |

---

## Part 5: Test & Publish

### Preview Mode

1. Click **Preview** in GTM (top right)
2. Enter your site URL (`https://divysharma.com` or `localhost:5173`)
3. GTM Tag Assistant opens — navigate through your site and verify:
   - `GA4 — Configuration` fires on every page
   - `GA4 — Event — Page View — SPA` fires on each route change
   - Custom event tags fire when you click nav links, share buttons, etc.
   - Check the **Data Layer** tab in Tag Assistant to see each push

### Publish

1. Close Preview
2. Click **Submit** (top right)
3. Version Name: `v1 — GA4 + all custom events`
4. Click **Publish**

### Verify in GA4

1. Go to **analytics.google.com** → your property with `G-5KLWWQ8D8V`
2. **Realtime** → you should see page views and events flowing
3. After 24h, check **Events** to see all custom events appear
4. Mark key events as **Conversions** in GA4: `contact:message_sent`, `cta:book_call`, `click:resume_download`

---

## Architecture Overview

| Layer                          | What it does                                                    |
| ------------------------------ | --------------------------------------------------------------- |
| **Vue code** (`src/`)          | Pushes events to `window.dataLayer` on user interactions        |
| **GTM container** (`GTM-P9B75L4Z`) | Listens for dataLayer events, routes them to GA4            |
| **GA4 property** (`G-5KLWWQ8D8V`)  | Receives and stores all events, builds reports              |

---

## Codebase Implementation Summary

65 `dataLayer.push()` calls were added across 20 files:

| File                    | Calls | Events                                                                 |
| ----------------------- | ----- | ---------------------------------------------------------------------- |
| `App.vue`               | 14    | `click:nav` (12 desktop+mobile), `click:mobile_menu` (2)              |
| `Home.vue`              | 6     | `click:resume_download`, `click:social` x3, `click:blog_card`, `click:view_all` |
| `footer.vue`            | 10    | `click:outbound` (5 icon row + 5 connect column)                      |
| `project.vue`           | 2     | `click:project_open` (external + internal)                             |
| `projects/project.vue`  | 1     | `click:project_outbound`                                               |
| `Explore.vue`           | 5     | `click:explore_card` x4, `click:resume_download`                       |
| `CTA.vue`               | 2     | `cta:book_call`, `cta:booking_close`                                   |
| `ContactForm.vue`       | 2     | `contact:message_sent`, `contact:form_error`                           |
| `Blog.vue`              | 3     | `click:blog_post`, `blog:filter_tag`, `blog:search` (debounced)        |
| `BlogDetail.vue`        | 6     | `blog:share_open`, `blog:copy_link`, `blog:share` x2, `blog:toc_click`, `click:related_post` |
| `BlogCard.vue`          | 1     | `blog:tag_click`                                                       |
| `Books.vue`             | 6     | `books:filter_open`, `books:filter_status`, `books:filter_quick`, `books:clear_filters`, `books:status_change`, `books:search` (debounced) |
| `FilterSheet.vue`       | 1     | `books:filter_apply`                                                   |
| `Journey.vue`           | 6     | `journey:sticker_place` x2, `journey:sticker_reposition`, `click:social` x2, `click:resume_download` |
| `ChatWidget.vue`        | 2     | `chat:toggle`, `chat:message_sent`                                     |
| `Mentors.vue`           | 2     | `mentors:filter`, `mentors:show_more`                                  |
| `NotFound.vue`          | 7     | `click:social` x7 (twitter, instagram, github, spotify, linkedin, behance, email) |
| `spotify.vue`           | 2     | `click:outbound` (logo + "not playing" link)                           |
| `top.vue`               | 1     | `click:outbound` (spotify link)                                        |
| `main.js`               | 1     | `page_view` (SPA route changes)                                        |
