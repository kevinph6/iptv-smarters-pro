"use client";

import { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Upload, Code, Eye, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  imageUrl?: string;
  onImageChange: (url: string) => void;
}

export const BlogEditor = ({ value, onChange, imageUrl, onImageChange }: BlogEditorProps) => {
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5 MB');
      return;
    }

    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to your image hosting service
      // For now, we'll convert to base64 and use it directly
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageChange(base64String);
        toast.success('Image téléchargée avec succès!');
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error('Erreur lors du téléchargement de l\'image');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erreur lors du téléchargement de l\'image');
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image supprimée');
  };

  const handleImageUrlInput = (url: string) => {
    setImagePreview(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-6">
      {/* Featured Image Upload Section */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="text-white font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image mise en avant
          </label>
          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-sm"
            >
              <X className="w-4 h-4" />
              Supprimer
            </button>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Upload Methods */}
        <div className="space-y-4">
          {/* File Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Télécharger une image
                </>
              )}
            </button>
            <p className="text-white/40 text-xs mt-2 text-center">
              JPG, PNG, GIF jusqu'à 5 MB
            </p>
          </div>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white/60">OU</span>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <input
              type="url"
              value={imagePreview}
              onChange={(e) => handleImageUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-white/40 text-xs mt-2">
              Ou collez l'URL d'une image
            </p>
          </div>
        </div>
      </div>

      {/* Editor Mode Toggle */}
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
        <button
          type="button"
          onClick={() => setEditorMode('visual')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
            editorMode === 'visual'
              ? 'bg-purple-600 text-white'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          Éditeur visuel
        </button>
        <button
          type="button"
          onClick={() => setEditorMode('html')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
            editorMode === 'html'
              ? 'bg-purple-600 text-white'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <Code className="w-4 h-4" />
          Mode HTML
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        {editorMode === 'visual' ? (
          <div className="prose-editor">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              className="bg-white text-black min-h-[400px]"
              placeholder="Commencez à écrire votre article..."
            />
          </div>
        ) : (
          <div className="p-4">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 h-96 resize-y font-mono text-sm"
              placeholder="<h2>Introduction</h2><p>Votre contenu HTML ici...</p>"
            />
            <p className="text-white/40 text-xs mt-2">
              Mode HTML : Vous pouvez écrire du HTML personnalisé
            </p>
          </div>
        )}
      </div>

      {/* Character Count */}
      <div className="flex justify-between text-white/40 text-sm">
        <span>Contenu</span>
        <span>{value.length} caractères</span>
      </div>
    </div>
  );
};