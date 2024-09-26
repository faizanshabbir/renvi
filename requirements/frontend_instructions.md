# Background Context
We are creating a web app that allows users to upload images and get interior design recommendations. We are using Replicate's API to run a model that generates interior design recommendations.

Our entire stack will consist of the following technologies:
- Next.js
- TailwindCSS
- ShadCN
- Clerk
- Supabase
- Replicate API

# Replicate Docs
Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=r8_DTx**********************************

Visibility

Copy
Learn more about authentication

Install Replicate’s Node.js client library

npm install replicate

Copy
Learn more about setup
Run erayyavuz/interior-ai using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    input: "https://replicate.delivery/pbxt/Le6cFNZK8c903LfhK5Zhh7v294gsZc3wWKlBfbGJthfr40bM/modern-farmhouse-bedroom.webp",
    prompt: "A modern industrial bedroom with exposed brick walls, a black metal bed frame, and neutral-toned bedding. The room features large windows with sheer curtains, a soft area rug, and a minimalist wardrobe. A small desk with a modern lamp is placed next to the bed.",
    negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional",
    num_inference_steps: 25
};

const output = await replicate.run("erayyavuz/interior-ai:d", { input });
console.log(output)
//=> "https://replicate.delivery/pbxt/Fm3zKeJddFSwMSeG5cZnWfpp...

# Requirements
We already have a basic dashboard component that allows users to select images and input a prompt, however the image upload functionality is not yet implemented.

- When a user selects an image, the image should be uploaded to Replicate's API.
- When a user inputs a prompt, the prompt should be sent to Replicate's API.
- We are skipping the negative prompt for now.
- The dashboard only has a place for the generated image to be displayed.
- Let's also add an image showing what the user's room looked like before the changes. (this will be the original image)
- The response from the Replicate API should be displayed to the user in the generated image section.

# Project Structure
.next
app
├── fonts
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx
components
├── ui
│   └── dashboard.tsx
lib
├── utils.ts
node_modules
requirements
├── frontend_instructions.md
.eslintrc.json
.gitignore
components.json
next-env.d.ts
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json

# Rules
All new components should be added to the components folder.
All new pages should be added to the app folder.
