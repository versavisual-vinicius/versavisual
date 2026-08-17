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
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4",
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
}: {
  src: string
  alt?: string
  id: string
  className?: string
}) {
  const context = React.useContext(GalleryContext)
  if (!context) throw new Error("GalleryImage must be used within a Gallery")

  return (
    <motion.button
      type="button"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "relative mb-4 block w-full break-inside-avoid cursor-zoom-in overflow-hidden rounded-xs bg-navy text-left",
        className,
      )}
      onClick={() => context.setSelectedImage({ id, src, alt })}
      aria-label={alt ? `Ampliar: ${alt}` : "Ampliar imagem"}
    >
      <motion.img
        layoutId={`image-${id}`}
        src={src}
        alt={alt || "Imagem da galeria"}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-xs object-cover"
        variants={{
          hover: { scale: 0.98 },
          tap: { scale: 0.95 },
        }}
        transition={spring}
      />
      <motion.span
        variants={{ hover: { opacity: 1 }, tap: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 rounded-xs bg-ink/10"
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </motion.button>
  )
}

function GalleryModal() {
  const context = React.useContext(GalleryContext)
  if (!context) return null

  const { selectedImage, setSelectedImage } = context

  return createPortal(
    <AnimatePresence>
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
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
              layoutId={`image-${selectedImage.id}`}
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
            className="absolute right-4 top-4 z-50 rounded-full border border-off/20 bg-off/10 p-2.5 text-off backdrop-blur-md transition-colors hover:bg-off/20 sm:right-6 sm:top-6"
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
