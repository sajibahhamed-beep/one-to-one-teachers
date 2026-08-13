import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OTOTeachers — ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম",
    short_name: "OTOTeachers",
    description: "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস।",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF7EF",
    theme_color: "#0D2C4A",
    icons: [
      {
        src: "/Assets/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Assets/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
