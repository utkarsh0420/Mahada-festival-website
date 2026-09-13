import React, { useState, useEffect } from "react";
import { 
  Image as ImageIcon, Save, Plus, Trash2, Sparkles, Calendar, Eye 
} from "lucide-react";
import { 
  FestiveCard, FestiveInput, FestiveTextarea, FestiveButton 
} from "./FestiveControls";
import { useLanguage } from "../../context/LanguageContext";

const GalleryManager = ({ config, onSaveGallery, onNotify }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [isSaving, setIsSaving] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (config?.gallery) {
      setGallery(JSON.parse(JSON.stringify(config.gallery)));
    }
  }, [config]);

  const handleAddPhoto = () => {
    setGallery([
      {
        id: Date.now(),
        titleMr: "नवीन उत्सव छायाचित्र",
        titleEn: "New Festival Photo",
        category: "महाआरती",
        categoryEn: "Maha Aarti",
        year: config?.festivalYear || "२०२६",
        yearEn: "2026",
        descMr: "",
        descEn: "",
        imageUrl: "",
        accentColor: "from-amber-700 to-maroon-900"
      },
      ...gallery
    ]);
  };

  const handleRemovePhoto = (idx) => {
    if (window.confirm(isEn ? "Remove this photograph from the gallery?" : "हे छायाचित्र काढून टाकायचे आहे का?")) {
      setGallery(gallery.filter((_, i) => i !== idx));
    }
  };

  const handleChange = (idx, field, val) => {
    const updated = [...gallery];
    updated[idx][field] = val;
    setGallery(updated);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    const res = await onSaveGallery(gallery);
    setIsSaving(false);
    if (res?.success) {
      if (onNotify) onNotify(isEn ? "Photo gallery updated successfully!" : "छायाचित्र गॅलरी अद्ययावत केली!");
    } else {
      if (onNotify) onNotify(isEn ? "Failed to save gallery" : "गॅलरी जतन करताना त्रुटी आली", "error");
    }
  };

  return (
    <FestiveCard
      title={
        isEn 
          ? "Festival Photo Gallery Manager" 
          : "उत्सव छायाचित्र गॅलरी व्यवस्थापक"
      }
      subtitle={
        isEn
          ? "Manage memorable photos, captions, categories, years, and descriptions displayed in the festival gallery."
          : "वेबसाईटवरील 'मागील उत्सवांची अविस्मरणीय छायाचित्रे' गॅलरीमधील फोटो, मथळे, वर्गवारी व वर्णन व्यवस्थापित करा."
      }
      icon={ImageIcon}
      badge={isEn ? "Photo Gallery" : "गॅलरी"}
      action={
        <div className="flex items-center gap-2">
          <FestiveButton
            onClick={handleAddPhoto}
            icon={Plus}
            variant="secondary"
            size="md"
          >
            {isEn ? "Add New Photo" : "नवीन फोटो जोडा"}
          </FestiveButton>
          <FestiveButton
            onClick={handleSubmit}
            icon={Save}
            variant="primary"
            size="md"
            disabled={isSaving}
          >
            {isSaving 
              ? (isEn ? "Saving..." : "जतन करत आहे...") 
              : (isEn ? "Save Gallery (गॅलरी जतन करा)" : "गॅलरी जतन करा (Save)")
            }
          </FestiveButton>
        </div>
      }
    >
      <div className="space-y-4">
        {gallery.map((photo, idx) => (
          <div
            key={photo.id || idx}
            className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-gold-300 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-gold-200 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gold-400 text-maroon-950 font-black px-2.5 py-0.5 rounded-full">
                  #{idx + 1}
                </span>
                <h4 className="text-sm font-black text-maroon-950 font-heading">
                  {isEn ? (photo.titleEn || photo.titleMr || `Photo #${idx + 1}`) : (photo.titleMr || `नवीन फोटो #${idx + 1}`)}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                title={isEn ? "Remove photo" : "फोटो काढा"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FestiveInput
                label={isEn ? "Title (Marathi) *" : "मथळा / शीर्षक (मराठी) *"}
                value={photo.titleMr}
                onChange={(e) => handleChange(idx, "titleMr", e.target.value)}
                placeholder="उदा. श्री गणरायाची भव्य मूर्ती प्रतिष्ठापना"
              />
              <FestiveInput
                label={isEn ? "Title (English)" : "English Title"}
                value={photo.titleEn}
                onChange={(e) => handleChange(idx, "titleEn", e.target.value)}
                placeholder="e.g. Grand Eco-Friendly Bappa Murti Sthapana"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FestiveInput
                label={isEn ? "Category" : "वर्गवारी (Category)"}
                value={photo.category}
                onChange={(e) => handleChange(idx, "category", e.target.value)}
                placeholder="उदा. महाआरती / मूर्ती / सांस्कृतिक / मिरवणूक"
              />
              <FestiveInput
                label={isEn ? "Year" : "वर्ष (Year)"}
                value={photo.year}
                onChange={(e) => handleChange(idx, "year", e.target.value)}
                placeholder="२०२६ / 2026"
              />
              <FestiveInput
                label={isEn ? "Image URL (or path)" : "फोटो URL (Image URL)"}
                value={photo.imageUrl || ""}
                onChange={(e) => handleChange(idx, "imageUrl", e.target.value)}
                placeholder="https://... किंवा /photo1.jpg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FestiveTextarea
                label={isEn ? "Description (Marathi)" : "तपशील / वर्णन (मराठी)"}
                rows={2}
                value={photo.descMr}
                onChange={(e) => handleChange(idx, "descMr", e.target.value)}
                placeholder="सर्व ४ इमारतींमधील शेकडो भाविकांनी एकत्र येऊन..."
              />
              <FestiveTextarea
                label={isEn ? "Description (English)" : "English Description"}
                rows={2}
                value={photo.descEn}
                onChange={(e) => handleChange(idx, "descEn", e.target.value)}
                placeholder="Hundreds of residents gathered for the grand aarti..."
              />
            </div>
          </div>
        ))}
      </div>
    </FestiveCard>
  );
};

export default GalleryManager;
