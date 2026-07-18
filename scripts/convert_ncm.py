"""
Convert .ncm (NetEase Cloud Music encrypted) files to .mp3 and copy to public/music/.
Usage: python scripts/convert_ncm.py <source_dir>
"""
import os
import sys
import shutil
from ncmdump import dump

MUSIC_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "music")

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/convert_ncm.py <source_directory>")
        print("  source_directory: folder containing .ncm files")
        sys.exit(1)

    src_dir = sys.argv[1]
    if not os.path.isdir(src_dir):
        print(f"Error: '{src_dir}' is not a valid directory")
        sys.exit(1)

    ncm_files = [f for f in os.listdir(src_dir) if f.lower().endswith(".ncm")]
    if not ncm_files:
        print("No .ncm files found in the source directory.")
        sys.exit(1)

    os.makedirs(MUSIC_DIR, exist_ok=True)

    print(f"Found {len(ncm_files)} .ncm file(s)\n")

    for f in ncm_files:
        src = os.path.join(src_dir, f)
        dest_name = f.replace(".ncm", ".mp3").replace(".NCM", ".mp3")
        dest = os.path.join(MUSIC_DIR, dest_name)
        print(f"Converting: {f} -> {dest_name} ...", end=" ")
        try:
            dump(src, dest)
            print("OK")
        except Exception as e:
            print(f"FAILED: {e}")

    print(f"\nDone! Files are in: {MUSIC_DIR}")
    print("Rename the files to match the playlist in lib/music.ts")

if __name__ == "__main__":
    main()
