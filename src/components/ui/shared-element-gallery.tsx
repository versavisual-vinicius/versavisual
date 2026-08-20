import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageData {
  id: string
  src: string
  alt?: string
}

interface GalleryContextType {
  selectedImage: ImageData | null
  setSelectedImage: (image: ImageData | null) => void
}

const GalleryContext = React.createContext<GalleryContextType | null>(null)

const spring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 35,
  mass: 1,
}

export function Gallery({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = React.useState<ImageData | null>(
    null,
  )

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (selectedImage) document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedImage])

  return (
    <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
      <GalleryModal />
    </GalleryContext.Provider>
  )
}

export function GalleryGrid({
  children,
  className,
  featured = false,
}: {
  children: React.ReactNode
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        featured
          ? "grid grid-cols-2 items-start gap-3 sm:gap-4"
          : "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function GalleryImage({
  src,
  alt,
  id,
  className,
  loading,
  fetchPriority,
  featured,
  index,
}: {
  src: string
  alt?: string
  id: string
  className?: string
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  featured?: boolean
  index?: number
}) {
  const context = React.useContext(GalleryContext)
  if (!context) throw new Error("GalleryImage must be used within a Gallery")

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden rounded-sm bg-navy text-left",
        featured
          ? index === 0
            ? "col-span-2 aspect-[16/10]"
            : "aspect-[4/5]"
          : "aspect-[4/5]",
        className,
      )}
      onClick={() => context.setSelectedImage({ id, src, alt })}
      aria-label={alt ? `Ampliar: ${alt}` : "Ampliar imagem"}
    >
      <motion.img
        src={src}
        alt={alt || "Imagem da galeria"}
        loading={loading ?? "lazy"}
        fetchPriority={fetchPriority}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        variants={{
          hover: { scale: 0.98 },
          tap: { scale: 0.95 },
        }}
        transition={spring}
      />
      <motion.span
        className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10"
        aria-hidden="true"
      />
    </motion.button>
  )
}

function GalleryModal() {
  const context = React.useContext(GalleryContext)
  if (!context || typeof document === "undefined") return null

  const { selectedImage, setSelectedImage } = context

  return createPortal(
    <AnimatePresence>
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da imagem"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full cursor-zoom-out bg-ink/90 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar visualização ampliada"
          />

          <motion.div
            className="relative z-10 flex h-full w-full cursor-zoom-out items-center justify-center p-4 sm:p-8"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (
                Math.abs(info.offset.y) > 100 ||
                Math.abs(info.velocity.y) > 300
              ) {
                setSelectedImage(null)
              }
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.alt || "Imagem ampliada da galeria"}
              className="max-h-[88vh] max-w-[95vw] rounded-xs object-contain shadow-2xl"
              draggable={false}
              transition={spring}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="absolute right-4 top-4 z-50 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-off/20 bg-off/10 text-off backdrop-blur-md transition-colors hover:bg-off/20 sm:right-6 sm:top-6"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Fechar galeria"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
