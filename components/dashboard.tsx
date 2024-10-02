"use client"

import React, { useEffect, useState } from 'react'
import { Upload, Send, Image as ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

  const loadCredits = async () => {
    console.log(supabaseClient)
    if (!supabaseClient) return; // Ensure the client is initialized

    const { data, error } = await supabaseClient
      .from('credits')
      .select();

    if (error) {
      console.error('Error fetching credits:', error);
    } else {
      console.log('data:', data);
      // You can also set a state here if needed
      setNumCredits(data[0].num_credits);
      console.log(data[0].num_credits)
      console.log(numCredits)
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
            <Button onClick={numCredits < 1 ? () => window.location.href = "/" : handleSubmit} disabled={!uploadedImage || !prompt || !style || isLoading}>
              {isLoading ? 'Processing...' : numCredits < 1 ? 'Purchase Credits' : 'Generate'}
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