import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

const BUCKET_NAME = 'renviimages' // Specify your Supabase bucket name here

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
  console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY)
  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err)
        res.status(500).json({ error: 'Error uploading file' })
        return
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file
      if (!file) {
        res.status(400).json({ error: "No file uploaded" })
        return
      }

      try {
        const fileContent = await fs.promises.readFile(file.filepath)
        const fileName = `${Date.now()}_${file.originalFilename}`

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME) // Use the bucket name here
          .upload(fileName, fileContent, {
            contentType: file.mimetype!,
          })

        if(data) {
          console.log('Data uploaded')
        }

        if (error) {
          console.error('Supabase storage error:', error)
          throw error
        }

        const { data: urlData } = supabase.storage
          .from(BUCKET_NAME) // Use the bucket name here as well
          .getPublicUrl(fileName)

        console.log('File uploaded:', urlData.publicUrl)
        res.status(200).json({ url: urlData.publicUrl })
      } catch (error) {
        console.error('Error uploading to Supabase:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        res.status(500).json({ error: 'Error uploading file to storage', details: errorMessage })
      } finally {
        // Clean up the temp file
        fs.unlink(file.filepath, (err) => {
          if (err) console.error('Error deleting temp file:', err)
        })
      }
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}