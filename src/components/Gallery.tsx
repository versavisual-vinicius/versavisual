import * as React from "react"
import {
  Gallery as SharedGallery,
  GalleryGrid,
  GalleryImage,
} from "./ui/shared-element-gallery"
import { img } from "../lib/images"

type Props = {
  photos: readonly string[]
  label: string
}

export default function Gallery({ photos, label }: Props) {
  const galleryId = React.useId()

  return (
    <SharedGallery>
      <GalleryGrid>
        {photos.map((photo, index) => (
          <GalleryImage
            key={photo}
            id={`${galleryId}-${label}-${photo}`}
            src={img(photo, 1600)}
            alt={`${label} — imagem ${index + 1}`}
            loading={index < 4 ? "eager" : "lazy"}
            fetchPriority={index < 3 ? "high" : "auto"}
          />
        ))}
      </GalleryGrid>
    </SharedGallery>
  )
}
