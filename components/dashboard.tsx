"use client"

import React, { useEffect, useState } from 'react'
import { Upload, Send, Image as ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useSupabaseClient from '@/lib/useSupabaseClient'; // Import the custom hook
import { useAuth } from '@clerk/nextjs'


export function DashboardComponent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('')
  const [outputImage, setOutputImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [numCredits, setNumCredits] = useState(0)
  const { supabaseClient, initializeSupabaseClient } = useSupabaseClient(); // Use the custom hook
  const { userId } = useAuth();

  const styleOptions = [
    { id: 'modern', name: 'Modern', image: '/modern.png?height=100&width=100' },
    { id: 'rustic', name: 'Rustic', image: '/rustic.png?height=100&width=100' },
    { id: 'minimalist', name: 'Minimalist', image: '/minimalistic.png?height=100&width=100' },
    { id: 'industrial', name: 'Industrial', image: '/industrial.png?height=100&width=100' },
    { id: 'bohemian', name: 'Bohemian', image: '/bohemian.png?height=100&width=100' },
    { id: 'scandinavian', name: 'Scandinavian', image: '/scandinavian.png?height=100&width=100' },
  ]

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
        console.log(data)
        setUploadedImage(data.url)
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    // Decrement credits after sending replicate submit
    if(userId) {
      await updateCredits(userId, numCredits - 1); // Decrement credits by 1
    }
    //Should record requests and response status info in a table so if users experience issues, we can corroroborate and fix

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
      setOutputImage(data.output[1])

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

  useEffect(() => {
    console.log("output image", outputImage);
  }, [outputImage]);

  const loadCredits = async () => {
    console.log(supabaseClient)
    if (!supabaseClient) return; // Ensure the client is initialized

    const { data, error } = await supabaseClient
      .from('credits')
      .select();

    if (error) {
      console.error('Error fetching credits:', error);
    } else {
      // You can also set a state here if needed
      setNumCredits(data[0].num_credits);
    }
  };

  useEffect(() => {
    loadCredits();
  }, [supabaseClient]); // Load credits when supabaseClient is set

  const updateCredits = async (userId: string, amount: number) => {
    // Ensure the Supabase client is initialized with a valid token
    await initializeSupabaseClient(); // Refresh the Supabase client

    console.log(supabaseClient);
    if (!supabaseClient) return; // Ensure the client is initialized

    try {
      await initializeSupabaseClient();

      const { data, error } = await supabaseClient
        .from('credits')
        .update({ num_credits: amount }) // Update the credits
        .eq('clerk_user_id', userId); // Specify the user_id

      if (error) {
        console.error('Error updating credits:', error);
      } else {
        console.log('Credits updated successfully:', data);
        loadCredits(); // Reload credits to reflect the changes
      }
    } catch (error) {
      console.error('Unexpected error updating credits:', error);
    }
  };
  
  // Test button to update credits
  const handleTestUpdateCredits = async () => {
    if (userId) {
      const newCreditAmount = numCredits - 1; // Decrement by 1 for testing
      await updateCredits(userId, newCreditAmount);
    } else {
      alert('User ID is not available.');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Renvi - AI Virtual Designer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
      <Card className="w-full max-w-md"> {/* Set a max width for the card */}
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
                <Label>Style</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {styleOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                        style === option.id ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setStyle(option.id)}
                    >
                      <img src={option.image} alt={option.name} className="w-full h-auto" />
                      <p className="text-xs text-center py-1">{option.name}</p>
                    </div>
                  ))}
                </div>
              </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="space-x-2">
            <Button onClick={handleSubmit} disabled={!uploadedImage || !prompt || !style || isLoading || numCredits < 1}>
              {isLoading ? 'Processing...' : 'Generate'}
              {isLoading ? <Upload className="ml-2 h-4 w-4 animate-spin" /> : <Send className="ml-2 h-4 w-4" />}
            </Button>
            {numCredits < 1 ? 
            <Button onClick={() => window.location.href = "/"}>
              Purchase Credits
              <Send className="ml-2 h-4 w-4" />
            </Button>:''}
          </div>
        </CardFooter>
      </Card>
      </div>
      <div>
      <Card className="w-full max-w-md"> {/* Set a max width for the card */}
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
          <div>
        {numCredits}
      </div>
      {/* Test button to update credits */}
      <Button onClick={handleTestUpdateCredits} disabled={numCredits <= 0}>
        Test Update Credits
      </Button>
    </div>
  )
}