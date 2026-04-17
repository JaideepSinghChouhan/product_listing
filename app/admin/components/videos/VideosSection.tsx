"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { api } from "@/lib/api";

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function VideosSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!videoFile && !videoUrl.trim()) {
      alert("Upload a video file or paste a video URL");
      return;
    }

    try {
      setSaving(true);

      const payload: any = {
        title: title.trim(),
        url: videoUrl.trim(),
      };

      if (videoFile) {
        payload.video = await fileToDataUrl(videoFile);
      }

      if (thumbnailFile) {
        payload.thumbnail = await fileToDataUrl(thumbnailFile);
      }

      const res = await api("/videos", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res?.error) {
        throw new Error(res?.details || res.error);
      }

      setTitle("");
      setVideoUrl("");
      setVideoFile(null);
      setThumbnailFile(null);
      await fetchVideos();
    } catch (err: any) {
      alert(err?.message || "Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;

    try {
      setLoading(true);
      const res = await api(`/videos/${id}`, {
        method: "DELETE",
      });

      if (res?.error) {
        throw new Error(res?.details || res.error);
      }

      await fetchVideos();
    } catch (err: any) {
      alert(err?.message || "Failed to delete video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="border rounded-2xl bg-background p-6 flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Video Upload
            </p>
            <h2 className="font-playfair text-2xl mt-2">Add New Video</h2>
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            className="border rounded-xl px-4 py-3 text-sm"
          />

          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Optional video URL fallback"
            className="border rounded-xl px-4 py-3 text-sm"
          />

          <label className="border border-dashed rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-elevated transition">
            <div>
              <p className="text-sm font-medium">Upload video file</p>
              <p className="text-xs text-muted-foreground">
                MP4 / MOV recommended, portrait format preferred
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              {videoFile ? videoFile.name : "Choose file"}
            </div>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </label>

          <label className="border border-dashed rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-elevated transition">
            <div>
              <p className="text-sm font-medium">Upload thumbnail</p>
              <p className="text-xs text-muted-foreground">
                This will appear as the small product preview
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              {thumbnailFile ? thumbnailFile.name : "Choose file"}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            />
          </label>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {saving ? "Saving..." : "Add Video"}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Library
              </p>
              <h3 className="font-playfair text-2xl mt-2">Uploaded Videos</h3>
            </div>
            <p className="text-sm text-muted-foreground">{videos.length} items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="border rounded-2xl overflow-hidden bg-background">
                <div className="relative aspect-[9/16] bg-black">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={video.url}
                      poster={video.thumbnailUrl || undefined}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
                    {video.thumbnailUrl && (
                      <img
                        src={video.thumbnailUrl}
                        alt="thumb"
                        className="w-11 h-11 rounded-lg object-cover border border-white/60 shadow-sm"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">
                        {video.title}
                      </p>
                      <p className="text-white/80 text-xs truncate">
                        Portrait video
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
                      URL
                    </p>
                    <p className="text-sm truncate">{video.url}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-2 rounded-lg hover:bg-accent/10"
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!videos.length && (
            <div className="border rounded-2xl p-10 text-center text-sm text-muted-foreground">
              No videos uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
