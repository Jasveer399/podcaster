"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import GeneratePodcast from "@/components/GeneratePodcast";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { podcastTypes } from "@/utils";

const formSchema = z.object({
  podcastTitle: z.string().min(5, {
    message: "podcastTitle must be at least 5 characters.",
  }),
  podcastDescription: z.string().min(20, {
    message: "PodcastDescription must be at least 20 characters.",
  }),
});

export function Create_PodCast() {
  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioStoredId, setAudioStoredId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");
  const [imageStoredId, setImageStoredId] = useState<Id<"_storage"> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const { toast } = useToast();
  const createPodcast = useMutation(api.podcasts.createPodcast);

  const [podcastType, setPodcastType] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      if (!podcastType) {
        toast({
          title: "Please Provide Podcast Type",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      if (!audioUrl || !imageUrl) {
        toast({
          title: "Please Provide Audio and Image",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        podcastType,
        audioUrl,
        imageUrl,
        audioStorageId: audioStoredId!,
        imageStorageId: imageStoredId!,
        audioDuration,
        views: 0,
      });
      toast({
        title: "Podcast Created",
      });
      setIsSubmitting(false);
      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast({ title: "Error Createing Podcast", variant: "destructive" });
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-white-1 font-bold text-20">
        Create New Podcast Page
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-white-1 text-lg font-bold">
                    Podcast
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="Podcast Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-white-1 text-lg font-bold">
                    Podcast Descriptionst
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-orange-1"
                      placeholder="write a short description about the Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-orange-600" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select Podcast Type
              </Label>

              <Select onValueChange={(value) => setPodcastType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1 capitalize"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1 "
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {podcastTypes.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.name}
                      className="capitalize focus:bg-orange-1"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              setAudioStorageId={setAudioStoredId}
              setAudioDuration={setAudioDuration}
              setAudio={setAudioUrl}
              audio={audioUrl}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStoredId}
              image={imageUrl}
            />
            <div className="mt-10 w-full md:w-1/3">
              <Button
                className="w-full bg-orange-1 text-16 font-extrabold text-white-1 py-4 transition-all duration-200 hover:bg-black-1 border border-black-1 hover:border-orange-1"
                type="submit"
                // disabled={!form.formState.isValid}
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader className="animate-spin mr-2" />
                  </>
                ) : (
                  "Create Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default Create_PodCast;
