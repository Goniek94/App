type QRPlaceholderProps = {
  size?: number;
  seed?: string;
  light?: boolean;
};

function pseudoRandom(x: number, y: number, seed: number): boolean {
  const n = (x * 31 + y * 17 + seed) * 2654435761;
  return (n >>> 0) % 7 < 3;
}

function inFinderPattern(row: number, col: number): boolean | null {
  const tl = row < 7 && col < 7;
  const tr = row < 7 && col >= 14;
  const bl = row >= 14 && col < 7;
  if (!tl && !tr && !bl) return null;

  const r = tl ? row : row >= 14 ? row - 14 : row;
  const c = tl || bl ? col : col - 14;

  if (r === 0 || r === 6 || c === 0 || c === 6) return true;
  if (r === 1 || r === 5 || c === 1 || c === 5) return false;
  return true;
}

export function QRPlaceholder({ size = 120, seed = "default", light = false }: QRPlaceholderProps) {
  const GRID = 21;
  const cellSize = size / (GRID + 2);
  const offset = cellSize;
  const seedNum = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const fill = light ? "#0F1D38" : "#F5F0E8";
  const bg = light ? "#F5F0E8" : "#0B1426";

  return (
    <div
      style={{ width: size, height: size, backgroundColor: bg, borderRadius: 8, padding: 4 }}
    >
      <svg width={size - 8} height={size - 8} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: GRID }, (_, row) =>
          Array.from({ length: GRID }, (_, col) => {
            const finder = inFinderPattern(row, col);
            const isTimingRow = row === 6 && col > 7 && col < 13;
            const isTimingCol = col === 6 && row > 7 && row < 13;
            const isTiming = isTimingRow || isTimingCol;

            let filled: boolean;
            if (finder !== null) {
              filled = finder;
            } else if (isTiming) {
              filled = (row + col) % 2 === 0;
            } else {
              filled = pseudoRandom(row, col, seedNum);
            }

            return filled ? (
              <rect
                key={`${row}-${col}`}
                x={offset + col * cellSize + 1}
                y={offset + row * cellSize + 1}
                width={cellSize - 1}
                height={cellSize - 1}
                fill={fill}
              />
            ) : null;
          })
        )}
      </svg>
    </div>
  );
}
