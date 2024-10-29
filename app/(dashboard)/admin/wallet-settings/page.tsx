'use client'

import { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useToast } from 'hooks/use-toast'

const formSchema = z.object({
  threshold: z.number().min(0, "Threshold must be a positive number"),
  emails: z.array(z.string().email("Invalid email address")).min(1, "At least one email is required"),
  phoneNumbers: z.array(z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")).optional(),
})

export default function WalletSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threshold: 0,
      emails: [''],
      phoneNumbers: [''],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Failed to save settings')
      toast({
        title: "Settings saved",
        description: "Your wallet alert settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Wallet Alert Settings</CardTitle>
        <CardDescription>Configure low-balance alerts for the faucet wallet</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Low Balance Threshold (BSV)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.00000001" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormDescription>
                    Set the wallet balance threshold that triggers an alert
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Email Addresses</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter email addresses separated by commas" />
                  </FormControl>
                  <FormDescription>
                    Enter the email addresses that should receive alerts
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Phone Numbers (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone numbers separated by commas" />
                  </FormControl>
                  <FormDescription>
                    Enter the phone numbers that should receive SMS alerts (if enabled)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}