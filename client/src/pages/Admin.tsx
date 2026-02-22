import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Mail, Phone, Calendar, MapPin, Users, Loader2, Save, Check, Upload, Trash2,
  LogOut, Lock, Image, Search, Building2, Heart,
  PartyPopper, Sparkles, Plus, Minus, ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import type { Inquiry, CorporateContent, SiteImage } from "@shared/schema";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  type EventType, type EventSections, type SectionKey,
  EVENT_TYPES, DEFAULT_EVENT_CONTENT, SECTION_KEYS,
} from "@/hooks/use-event-content";

import defaultCorporateHero from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-022_(1)_1768864251304.jpg";
import defaultWeddingHero from "@assets/VERSACE_(3)_1769632123580.png";
import defaultPrivateHero from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-073_1766178470442.jpg";
import defaultOtherHero from "@assets/DJ_Miss_Haze_Wedding_DJ_Chicago_and_Denver-022_1766178470443.jpg";

type TabKey = "inquiries" | "corporate" | "private" | "wedding" | "other";

const TABS: { key: TabKey; label: string; icon: typeof Building2 }[] = [
  { key: "inquiries", label: "Inquiries", icon: Users },
  { key: "corporate", label: "Corporate", icon: Building2 },
  { key: "private", label: "Private", icon: PartyPopper },
  { key: "wedding", label: "Wedding", icon: Heart },
  { key: "other", label: "Other", icon: Sparkles },
];

interface ImageSlot {
  key: string;
  label: string;
  desc: string;
  defaultImage?: string;
}

const IMAGE_SLOTS: Record<string, ImageSlot[]> = {
  corporate: [
    { key: "hero_corporate", label: "Corporate Hero Banner", desc: "Full-width background image at the top of the Corporate Events page. Visitors see this first when they land on the site.", defaultImage: defaultCorporateHero },
  ],
  wedding: [
    { key: "hero_wedding", label: "Wedding Hero Banner", desc: "Full-width background image at the top of the Wedding page. Sets the mood for couples visiting the site.", defaultImage: defaultWeddingHero },
  ],
  private: [
    { key: "hero_private", label: "Private Events Hero Banner", desc: "Full-width background image at the top of the Private Events page. Shows the energy of private parties.", defaultImage: defaultPrivateHero },
  ],
  other: [
    { key: "hero_other", label: "PR Show / Other Events Hero Banner", desc: "Full-width background image at the top of the PR Show & Other Events page. Showcases brand activations and special events.", defaultImage: defaultOtherHero },
  ],
};

const SHARED_IMAGE_SLOT: ImageSlot = {
  key: "about_photo", label: "About DJ Miss Haze Photo (Shared)", desc: "Portrait photo shown in the 'About' section on all event pages. Displays in grayscale and transitions to full color on hover. Changing this updates it across all event types.", defaultImage: defaultCorporateHero,
};

function LoginForm() {
  const [password, setPassword] = useState("");
  const { login, loginPending } = useAdminAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(password);
    } catch {
      toast({ title: "Login Failed", description: "Incorrect password.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-black font-display uppercase text-white">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-400">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                data-testid="input-admin-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginPending} data-testid="button-admin-login">
              {loginPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ImageUploader({ imageKey, label, description, currentUrl, defaultImage }: {
  imageKey: string;
  label: string;
  description: string;
  currentUrl?: string;
  defaultImage?: string;
}) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const displayUrl = currentUrl || defaultImage;
  const isCustom = !!currentUrl;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageKey", imageKey);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData, credentials: "include" });
      if (!res.ok) throw new Error();
      queryClient.invalidateQueries({ queryKey: ["/api/site-images"] });
      toast({ title: "Uploaded!", description: `${label} updated.` });
    } catch {
      toast({ title: "Error", description: "Upload failed.", variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/site-images/${imageKey}`, { method: "DELETE", credentials: "include" });
      queryClient.invalidateQueries({ queryKey: ["/api/site-images"] });
      toast({ title: "Removed", description: `${label} reverted to default.` });
    } catch {
      toast({ title: "Error", description: "Failed to remove.", variant: "destructive" });
    }
  };

  return (
    <div className="bg-zinc-800/50 rounded-xl border border-zinc-700/50 overflow-hidden" data-testid={`image-slot-${imageKey}`}>
      <div className="relative w-full h-48 bg-zinc-900">
        {displayUrl ? (
          <img src={displayUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Image className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">No image uploaded</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1.5">
          {isCustom ? (
            <Badge className="bg-primary/90 text-black text-[10px] font-bold px-2 py-0.5">Custom</Badge>
          ) : defaultImage ? (
            <Badge variant="secondary" className="bg-zinc-700/90 text-zinc-300 text-[10px] font-bold px-2 py-0.5">Default</Badge>
          ) : null}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="font-semibold text-sm text-white">{label}</p>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="border-zinc-600 flex-1" data-testid={`button-upload-${imageKey}`}>
            {uploading ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <Upload className="w-3 h-3 mr-1.5" />}
            {currentUrl ? "Replace" : "Upload New"}
          </Button>
          {isCustom && (
            <Button size="sm" variant="destructive" onClick={handleDelete}
              data-testid={`button-delete-${imageKey}`}>
              <Trash2 className="w-3 h-3 mr-1.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*,video/mp4,video/quicktime" onChange={handleUpload} className="hidden" />
    </div>
  );
}

function SectionEditor({ title, children, saving, saved, onSave, testId }: {
  title: string;
  children: React.ReactNode;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  testId: string;
}) {
  return (
    <AccordionItem value={testId} className="border border-zinc-700/50 rounded-xl px-5 bg-zinc-800/30">
      <AccordionTrigger className="text-sm font-bold text-white hover:no-underline" data-testid={`accordion-${testId}`}>
        {title}
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pt-3 pb-5">
        {children}
        <Button onClick={onSave} disabled={saving} size="sm" data-testid={`button-save-${testId}`}>
          {saved ? <Check className="w-4 h-4 mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
          {saved ? "Saved!" : "Save"}
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}

function EventContentEditor({ eventType }: { eventType: EventType }) {
  const { toast } = useToast();
  const defaults = DEFAULT_EVENT_CONTENT[eventType];
  const [content, setContent] = useState<EventSections>({ ...defaults });
  const [savedSections, setSavedSections] = useState<Set<string>>(new Set());

  const { data: dbContent, isLoading } = useQuery<CorporateContent[]>({
    queryKey: ["/api/corporate-content"],
  });

  const { data: images } = useQuery<SiteImage[]>({ queryKey: ["/api/site-images"] });
  const imageMap = new Map(images?.map((img) => [img.imageKey, img.url]) || []);

  useEffect(() => {
    if (!dbContent) return;
    const updated = { ...DEFAULT_EVENT_CONTENT[eventType] };
    for (const section of SECTION_KEYS) {
      const dbKey = `event.${eventType}.${section}`;
      const match = dbContent.find((c) => c.sectionKey === dbKey);
      if (match) {
        (updated as any)[section] = match.content;
      } else if (eventType === "corporate") {
        const legacy = dbContent.find((c) => c.sectionKey === section);
        if (legacy) (updated as any)[section] = legacy.content;
      }
    }
    setContent(updated);
  }, [dbContent, eventType]);

  const saveMutation = useMutation({
    mutationFn: async ({ sectionKey, sectionContent }: { sectionKey: string; sectionContent: any }) => {
      return apiRequest("POST", "/api/corporate-content", { sectionKey, content: sectionContent });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/corporate-content"] });
      setSavedSections((prev) => new Set(prev).add(variables.sectionKey));
      setTimeout(() => setSavedSections((prev) => { const n = new Set(prev); n.delete(variables.sectionKey); return n; }), 2000);
      toast({ title: "Saved!", description: "Section updated successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
    },
  });

  const handleSave = (section: SectionKey) => {
    const dbKey = `event.${eventType}.${section}`;
    saveMutation.mutate({ sectionKey: dbKey, sectionContent: (content as any)[section] });
  };

  const isSaved = (section: SectionKey) => savedSections.has(`event.${eventType}.${section}`);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const eventLabel = EVENT_TYPES.find(e => e.key === eventType)?.label || eventType;
  const eventImageSlots = IMAGE_SLOTS[eventType] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black font-display uppercase text-white">{eventLabel} Events</h2>
        <p className="text-sm text-zinc-400 mt-1">Edit content and images for the {eventLabel.toLowerCase()} event page</p>
      </div>

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-3">
        <SectionEditor title="Hero Section" saving={saveMutation.isPending} saved={isSaved("hero")} onSave={() => handleSave("hero")} testId={`${eventType}-hero`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Subtitle</Label>
              <Input value={content.hero.subtitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-hero-subtitle`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Locations (comma-separated)</Label>
              <Input value={content.hero.locations.join(", ")} onChange={(e) => setContent({ ...content, hero: { ...content.hero, locations: e.target.value.split(",").map(s => s.trim()) } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-hero-locations`} />
            </div>
          </div>
        </SectionEditor>

        <SectionEditor title="Ticker Banner" saving={saveMutation.isPending} saved={isSaved("ticker")} onSave={() => handleSave("ticker")} testId={`${eventType}-ticker`}>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Ticker Items (comma-separated)</Label>
            <Textarea value={content.ticker.items.join(", ")} onChange={(e) => setContent({ ...content, ticker: { items: e.target.value.split(",").map(s => s.trim()) } })}
              className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-ticker-items`} />
          </div>
        </SectionEditor>

        <SectionEditor title="Signature Quote" saving={saveMutation.isPending} saved={isSaved("signature")} onSave={() => handleSave("signature")} testId={`${eventType}-signature`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Quote</Label>
              <Textarea value={content.signature.quote} onChange={(e) => setContent({ ...content, signature: { ...content.signature, quote: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-signature-quote`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Description</Label>
              <Textarea value={content.signature.description} onChange={(e) => setContent({ ...content, signature: { ...content.signature, description: e.target.value } })}
                rows={4} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-signature-description`} />
            </div>
          </div>
        </SectionEditor>

        <SectionEditor title="Mantra Section" saving={saveMutation.isPending} saved={isSaved("mantra")} onSave={() => handleSave("mantra")} testId={`${eventType}-mantra`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Title</Label>
              <Input value={content.mantra.title} onChange={(e) => setContent({ ...content, mantra: { ...content.mantra, title: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-mantra-title`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Quote</Label>
              <Input value={content.mantra.quote} onChange={(e) => setContent({ ...content, mantra: { ...content.mantra, quote: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-mantra-quote`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Subtitle</Label>
              <Input value={content.mantra.subtitle} onChange={(e) => setContent({ ...content, mantra: { ...content.mantra, subtitle: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-mantra-subtitle`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Paragraph 1</Label>
              <Textarea value={content.mantra.paragraph1} onChange={(e) => setContent({ ...content, mantra: { ...content.mantra, paragraph1: e.target.value } })}
                rows={3} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-mantra-p1`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Paragraph 2</Label>
              <Textarea value={content.mantra.paragraph2} onChange={(e) => setContent({ ...content, mantra: { ...content.mantra, paragraph2: e.target.value } })}
                rows={3} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-mantra-p2`} />
            </div>
          </div>
        </SectionEditor>

        <SectionEditor title="About Section" saving={saveMutation.isPending} saved={isSaved("about")} onSave={() => handleSave("about")} testId={`${eventType}-about`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Title</Label>
              <Input value={content.about.title} onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-about-title`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Paragraph 1</Label>
              <Textarea value={content.about.paragraph1} onChange={(e) => setContent({ ...content, about: { ...content.about, paragraph1: e.target.value } })}
                rows={4} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-about-p1`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Paragraph 2</Label>
              <Textarea value={content.about.paragraph2} onChange={(e) => setContent({ ...content, about: { ...content.about, paragraph2: e.target.value } })}
                rows={4} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-about-p2`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Paragraph 3</Label>
              <Textarea value={content.about.paragraph3} onChange={(e) => setContent({ ...content, about: { ...content.about, paragraph3: e.target.value } })}
                rows={3} className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-about-p3`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Footer</Label>
              <Input value={content.about.footer} onChange={(e) => setContent({ ...content, about: { ...content.about, footer: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-about-footer`} />
            </div>
          </div>
        </SectionEditor>

        <SectionEditor title="Call-to-Action" saving={saveMutation.isPending} saved={isSaved("cta")} onSave={() => handleSave("cta")} testId={`${eventType}-cta`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Title</Label>
              <Input value={content.cta.title} onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-cta-title`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Subtitle</Label>
              <Input value={content.cta.subtitle} onChange={(e) => setContent({ ...content, cta: { ...content.cta, subtitle: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-cta-subtitle`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Button Text</Label>
              <Input value={content.cta.button} onChange={(e) => setContent({ ...content, cta: { ...content.cta, button: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-cta-button`} />
            </div>
          </div>
        </SectionEditor>

        <SectionEditor title="FAQ" saving={saveMutation.isPending} saved={isSaved("faq")} onSave={() => handleSave("faq")} testId={`${eventType}-faq`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Section Title</Label>
              <Input value={content.faq.title} onChange={(e) => setContent({ ...content, faq: { ...content.faq, title: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-faq-title`} />
            </div>
            {content.faq.items.map((item, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-3 space-y-2 border border-zinc-700/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">FAQ {i + 1}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400 hover:text-red-300" onClick={() => {
                    const items = content.faq.items.filter((_, idx) => idx !== i);
                    setContent({ ...content, faq: { ...content.faq, items } });
                  }}><Minus className="w-3 h-3" /></Button>
                </div>
                <select value={item.category || ""} onChange={(e) => {
                  const items = [...content.faq.items]; items[i] = { ...items[i], category: e.target.value };
                  setContent({ ...content, faq: { ...content.faq, items } });
                }} className="w-full bg-zinc-900 border border-zinc-700 text-sm text-white rounded-md px-3 py-2" data-testid={`input-${eventType}-faq-cat-${i}`}>
                  <option value="">Select Category</option>
                  <option value="DJ & MC Services">DJ & MC Services</option>
                  <option value="Booking">Booking</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Locations">Locations</option>
                  <option value="Logistics & Reliability">Logistics & Reliability</option>
                </select>
                <Input placeholder="Question" value={item.question} onChange={(e) => {
                  const items = [...content.faq.items]; items[i] = { ...items[i], question: e.target.value };
                  setContent({ ...content, faq: { ...content.faq, items } });
                }} className="bg-zinc-900 border-zinc-700 text-sm" data-testid={`input-${eventType}-faq-q-${i}`} />
                <Textarea placeholder="Answer" value={item.answer} rows={2} onChange={(e) => {
                  const items = [...content.faq.items]; items[i] = { ...items[i], answer: e.target.value };
                  setContent({ ...content, faq: { ...content.faq, items } });
                }} className="bg-zinc-900 border-zinc-700 text-sm" data-testid={`input-${eventType}-faq-a-${i}`} />
              </div>
            ))}
            <Button size="sm" variant="outline" className="border-zinc-600" onClick={() => {
              setContent({ ...content, faq: { ...content.faq, items: [...content.faq.items, { question: "", answer: "", category: "DJ & MC Services" }] } });
            }} data-testid={`button-add-${eventType}-faq`}>
              <Plus className="w-3 h-3 mr-1.5" /> Add FAQ
            </Button>
          </div>
        </SectionEditor>

        <SectionEditor title="Reviews" saving={saveMutation.isPending} saved={isSaved("reviews")} onSave={() => handleSave("reviews")} testId={`${eventType}-reviews`}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Section Title</Label>
              <Input value={content.reviews.title} onChange={(e) => setContent({ ...content, reviews: { ...content.reviews, title: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-reviews-title`} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Rating Text</Label>
              <Input value={content.reviews.ratingText} onChange={(e) => setContent({ ...content, reviews: { ...content.reviews, ratingText: e.target.value } })}
                className="bg-zinc-800 border-zinc-700" data-testid={`input-${eventType}-reviews-rating`} />
            </div>
            {content.reviews.items.map((review, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-lg p-3 space-y-2 border border-zinc-700/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">Review {i + 1}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-400 hover:text-red-300" onClick={() => {
                    const items = content.reviews.items.filter((_, idx) => idx !== i);
                    setContent({ ...content, reviews: { ...content.reviews, items } });
                  }}><Minus className="w-3 h-3" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Author" value={review.author} onChange={(e) => {
                    const items = [...content.reviews.items]; items[i] = { ...items[i], author: e.target.value };
                    setContent({ ...content, reviews: { ...content.reviews, items } });
                  }} className="bg-zinc-900 border-zinc-700 text-sm" data-testid={`input-${eventType}-review-author-${i}`} />
                  <Input placeholder="Role / Location" value={review.role} onChange={(e) => {
                    const items = [...content.reviews.items]; items[i] = { ...items[i], role: e.target.value };
                    setContent({ ...content, reviews: { ...content.reviews, items } });
                  }} className="bg-zinc-900 border-zinc-700 text-sm" data-testid={`input-${eventType}-review-role-${i}`} />
                </div>
                <Textarea placeholder="Review text" value={review.text} rows={2} onChange={(e) => {
                  const items = [...content.reviews.items]; items[i] = { ...items[i], text: e.target.value };
                  setContent({ ...content, reviews: { ...content.reviews, items } });
                }} className="bg-zinc-900 border-zinc-700 text-sm" data-testid={`input-${eventType}-review-text-${i}`} />
              </div>
            ))}
            <Button size="sm" variant="outline" className="border-zinc-600" onClick={() => {
              setContent({ ...content, reviews: { ...content.reviews, items: [...content.reviews.items, { author: "", role: "", text: "" }] } });
            }} data-testid={`button-add-${eventType}-review`}>
              <Plus className="w-3 h-3 mr-1.5" /> Add Review
            </Button>
          </div>
        </SectionEditor>

        <AccordionItem value={`${eventType}-images`} className="border border-zinc-700/50 rounded-xl px-5 bg-zinc-800/30">
          <AccordionTrigger className="text-sm font-bold text-white hover:no-underline" data-testid={`accordion-${eventType}-images`}>
            <span className="flex items-center gap-2"><Image className="w-4 h-4 text-primary" /> Site Images</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-5 space-y-5">
            <p className="text-xs text-zinc-400">These images appear on the live {eventLabel} page. Upload custom images or keep the defaults. Images tagged "Default" will be replaced when you upload.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventImageSlots.map((slot) => (
                <ImageUploader key={`${eventType}-${slot.key}`} imageKey={slot.key} label={slot.label} description={slot.desc} currentUrl={imageMap.get(slot.key)} defaultImage={slot.defaultImage} />
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-700/30">
              <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">Shared Across All Events</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploader imageKey={SHARED_IMAGE_SLOT.key} label={SHARED_IMAGE_SLOT.label} description={SHARED_IMAGE_SLOT.desc} currentUrl={imageMap.get(SHARED_IMAGE_SLOT.key)} defaultImage={SHARED_IMAGE_SLOT.defaultImage} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function InquiriesView() {
  const { data: inquiries, isLoading, error } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  if (error) return <p className="text-center text-red-400 py-8">Failed to load inquiries</p>;

  const sorted = [...(inquiries || [])].reverse();
  const filtered = sorted.filter((inq) => {
    if (filterType !== "all" && inq.eventType.toLowerCase() !== filterType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        (inq.email?.toLowerCase().includes(q) ?? false) ||
        inq.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const uniqueTypes = Array.from(new Set(sorted.map(i => i.eventType.toLowerCase())));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-black font-display uppercase text-white">Booking Inquiries</h2>
          <p className="text-sm text-zinc-400 mt-1">{inquiries?.length || 0} total inquiries</p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">{filtered.length} shown</Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input placeholder="Search by name, email, or location..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-800 border-zinc-700" data-testid="input-inquiry-search" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white" data-testid="select-inquiry-filter">
          <option value="all">All Types</option>
          {uniqueTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">No inquiries match your filters</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-700/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700/50 hover:bg-transparent">
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Type</TableHead>
                <TableHead className="text-zinc-400">Location</TableHead>
                <TableHead className="text-zinc-400">Event Date</TableHead>
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inq) => (
                <TableRow key={inq.id} className="border-zinc-800 hover:bg-zinc-800/50" data-testid={`row-inquiry-${inq.id}`}>
                  <TableCell className="text-zinc-400 text-sm">
                    {inq.createdAt ? format(new Date(inq.createdAt), "MMM d, yyyy") : "N/A"}
                  </TableCell>
                  <TableCell><Badge variant="outline" className="capitalize border-zinc-600">{inq.eventType}</Badge></TableCell>
                  <TableCell className="text-zinc-300"><MapPin className="w-3 h-3 text-primary inline mr-1" />{inq.location}</TableCell>
                  <TableCell className="text-zinc-300"><Calendar className="w-3 h-3 text-zinc-500 inline mr-1" />{inq.date}</TableCell>
                  <TableCell className="font-medium text-white">{inq.name}</TableCell>
                  <TableCell>
                    {inq.email ? <span className="text-zinc-300 text-sm"><Mail className="w-3 h-3 text-zinc-500 inline mr-1" />{inq.email}</span> : <span className="text-zinc-600">-</span>}
                  </TableCell>
                  <TableCell>
                    {inq.phone ? <span className="text-zinc-300 text-sm"><Phone className="w-3 h-3 text-zinc-500 inline mr-1" />{inq.phone}</span> : <span className="text-zinc-600">-</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { isAdmin, isLoading, logout, logoutPending } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("inquiries");

  if (isLoading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!isAdmin) return <LoginForm />;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-black font-display uppercase">Site Admin</h1>
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors" data-testid="button-view-site">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Site</span>
                </button>
              </Link>
              <button
                onClick={() => logout()}
                disabled={logoutPending}
                className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                data-testid="button-logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>

          <div className="flex gap-1 -mb-px overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-zinc-400 hover:text-white hover:border-zinc-600"
                  }`}
                  data-testid={`tab-${tab.key}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "inquiries" && <InquiriesView />}
        {activeTab !== "inquiries" && <EventContentEditor key={activeTab} eventType={activeTab as EventType} />}
      </main>
    </div>
  );
}
