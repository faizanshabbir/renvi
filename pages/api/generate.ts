import { NextApiRequest, NextApiResponse } from 'next'
import Replicate from 'replicate'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { input, prompt, style } = req.body

      console.log('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN)
      console.log('Input received:', input)

      if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error('REPLICATE_API_TOKEN is not set')
      }

      // Ensure the input is a valid URL
      const imageUrl = new URL(input, `${req.headers.origin}/`).toString()

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      })

      const input_data = {
        input: imageUrl,
        prompt: `${prompt} in ${style} style`,
        negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional",
        num_inference_steps: 25
      };

      const output = await replicate.run(
        "erayyavuz/interior-ai:e299c531485aac511610a878ef44b554381355de5ee032d109fcae5352f39fa9",
        { input: input_data }
      )

      res.status(200).json({ output })
    } catch (error: unknown) {
      console.error('Error generating image:', error)
      if (error instanceof Error) {
        res.status(500).json({ error: 'Error generating image', details: error.message })
      } else {
        res.status(500).json({ error: 'An unknown error occurred' })
      }
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}