import type React from "react"
import { useRef } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.current) {
      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY").then(
        (result) => {
          toast({
            title: "Success!",
            description: "Your message has been sent successfully.",
          })
          form.current?.reset()
        },
        (error) => {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            variant: "destructive",
          })
        },
      )
    }
  }

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="user_name">Name</Label>
        <Input type="text" name="user_name" id="user_name" required className="bg-gray-700" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user_email">Email</Label>
        <Input type="email" name="user_email" id="user_email" required className="bg-gray-700" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" id="message" required className="bg-gray-700 min-h-[100px]" />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  )
}

export default ContactForm

