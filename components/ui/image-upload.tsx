import { useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "default",
  endpoint: "https://storage.iran.liara.space",
  credentials: {
    accessKeyId: "lo6v9pt9gmd533lq",
    secretAccessKey: "58a51fb1-088a-4618-8b14-b84b1bf3f052",
  },
});

const uploadFiles = async (file, fileName) => {
  const params = {
    Body: file,
    Bucket: "wings-cms",
    Key: fileName,
  };
  try {
    const upload = await client.send(new PutObjectCommand(params));
    if (!upload) {
      throw new Error("Something went wrong while uploading the image");
    }
    const command = new GetObjectCommand({
      Bucket: "wings-cms",
      Key: fileName,
    });
    return await getSignedUrl(client, command);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
    console.log(files);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const signedUrl = await uploadFiles(selectedFile, selectedFile.name);
          // @ts-ignore
        onChange(signedUrl);
        // onChange([...value, signedUrl]);
        setSelectedFile(null);
      } catch (error) {
        console.error(error);
      }
    }
  };
console.log(value);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#0b1f5738] hover:bg-[#160e5f54] transition-colors delay-100 w-[90%] sm:w-[40%] p-10 rounded-3xl">
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] overflow-hidden rounded-md"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      {/* Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
        />
        <Button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || disabled}
        >
          Upload
        </Button>
      </div>
      {/* Upload */}
    </div>
  );
};

export default ImageUpload;