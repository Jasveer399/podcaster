import { GeneratePodcastProps } from "@/types/types";
import React, { useState, useRef } from "react";
import { Loader } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "./ui/input";
import Image from "next/image";

const useGeneratePodcast = ({
  setAudio,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const generateUploadFile = useMutation(api.files.generateUploadUrl);
  const imageRef = useRef<HTMLInputElement>(null);
  const { startUpload } = useUploadFiles(generateUploadFile);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const { toast } = useToast();

  const uploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleAudio(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading audio", variant: "destructive" });
    }
  };

  const handleAudio = async (blob: Blob, fileName: string) => {
    setIsGenerating(true);
    setAudio("");

    try {
      const newfileName = fileName + uuidv4();
      const file = new File([blob], newfileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Audio uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading audio", variant: "destructive" });
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    uploadAudio,
    imageRef,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, uploadAudio, imageRef } = useGeneratePodcast(props);
  const [ispaly, setIspaly] = useState(true);
  return (
    <div>
      <h1 className="text-16 font-bold text-white-1 mt-10">
        Upload Audio File of Podcast
      </h1>
      <div className="image_div" onClick={() => imageRef?.current?.click()}>
        <Input
          type="file"
          accept="audio/*"
          className="hidden"
          ref={imageRef}
          onChange={(e) => uploadAudio(e)}
        />
        {!isGenerating ? (
          <Image
            src="/icons/upload-image.svg"
            width={40}
            height={40}
            alt="upload"
          />
        ) : (
          <div className="text-16 flex-center font-medium text-white-1">
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-16 font-bold text-orange-1">Click to upload Audio</h2>
          <p className="text-12 font-normal text-gray-1">
            Upload Only mp3 files
          </p>
        </div>
      </div>
      {props.audio && (
        <div className="flex items-center">
          <div
            className="bg-orange-1 text-white-1 py-1 px-3 mt-6 mr-2 rounded-md shadow-lg text-xl font-bold cursor-pointer hover:bg-orange-600"
            onClick={() => setIspaly(!ispaly)}
          >
            X
          </div>
          {ispaly ? (
            <audio
              controls
              src={props.audio}
              autoPlay
              className="mt-5"
              onLoadedMetadata={(e) =>
                props.setAudioDuration(e.currentTarget.duration)
              }
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratePodcast;
