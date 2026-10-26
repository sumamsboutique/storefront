const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

/**
 * Check that a file's leading bytes agree with its browser-provided MIME type.
 * This is a format sanity check, not a full image decoder or malware scan.
 */
export async function hasMatchingImageSignature(file: Blob & { type: string }): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer())

  if (file.type === 'image/jpeg') {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  }

  if (file.type === 'image/png') {
    return PNG_SIGNATURE.every((byte, index) => bytes[index] === byte)
  }

  if (file.type === 'image/webp') {
    return (
      bytes.length >= 12 &&
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
    )
  }

  return false
}
