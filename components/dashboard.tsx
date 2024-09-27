"use client"

import { useState } from 'react'
import { Upload, Send, Image as ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardComponent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [outputImage, setOutputImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        setUploadedImage(data.url)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const fullImageUrl = new URL(uploadedImage!, window.location.origin).toString()
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: fullImageUrl,
          prompt,
          style,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'An error occurred while generating the image')
      }

      const data = await response.json()
      setOutputImage(data.output)
    } catch (error: unknown) {
      console.error("Error generating image:", error)
      // Handle error (e.g., show error message to user)
      if (error instanceof Error) {
        alert(`Error: ${error.message}`)
      } else {
        alert('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Renvi - AI Virtual Designer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                {uploadedImage && (
                  <div className="mt-2">
                    <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto" />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="prompt">Prompt</Label>
                <Input 
                  id="prompt" 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)} 
                  placeholder="Describe your desired changes..."
                />
              </div>
              <div>
                <Label htmlFor="style">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="rustic">Rustic</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={!uploadedImage || !prompt || !style || isLoading}>
              {isLoading ? 'Processing...' : 'Generate'}
              {isLoading ? <Upload className="ml-2 h-4 w-4 animate-spin" /> : <Send className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedImage && (
                <div>
                  <h3 className="font-semibold mb-2">Original Room</h3>
                  <img src={uploadedImage} alt="Original Room" className="max-w-full h-auto" />
                </div>
              )}
              <div>
                <h3 className="font-semibold mb-2">Renovated Room</h3>
                {outputImage ? (
                  <img src={outputImage} alt="Generated" className="max-w-full h-auto" />
                ) : (
                  <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                    <ImageIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}