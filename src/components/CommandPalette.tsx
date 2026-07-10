import { isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { externalTools } from '../externalTools';
import { tools } from '../tools';
import { Icon } from './Icon';
import { Modal } from './Modal';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Filter tools by name and keywords but prioritize name matches. */
function getSortedMatches<T extends { name: string; keywords: string[] }>(
  items: T[],
  query: string
) {
  return items
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(query))
    )
    .toSorted((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query);
      const bNameMatch = b.name.toLowerCase().includes(query);
      if (aNameMatch && bNameMatch === false) {
        return -1;
      }
      if (aNameMatch === false && bNameMatch) {
        return 1;
      }
      return 0;
    });
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const query = searchQuery.toLowerCase();

  const filteredTools = [
    ...getSortedMatches(tools, query),
    ...getSortedMatches(externalTools, query),
  ];

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setSearchQuery('');
      setSelectedIndex(0);
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset selection index when search query changes
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleToolSelection = (tool: (typeof filteredTools)[0]) => {
    if ('url' in tool) {
      if (isTauri()) {
        void openUrl(tool.url);
      } else {
        window.open(tool.url, '_blank', 'noopener,noreferrer');
      }
    } else {
      void navigate(`/${tool.id}/`);
    }
    dialogRef.current?.close();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredTools.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleToolSelection(filteredTools[selectedIndex]);
    }
  };

  return (
    <Modal
      id="search-dialog"
      label="Search"
      isOpen={isOpen}
      onClose={onClose}
      dialogRef={dialogRef}
    >
      <input
        ref={inputRef}
        id="search-dialog-input"
        type="text"
        aria-label="Search tools"
        placeholder="Search tools…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border-light-border bg-text-background font-body text-text-foreground placeholder:text-secondary-text-foreground w-full border-x-0 border-t-0 border-b border-solid p-4 text-base/none outline-none focus-visible:outline-none"
      />
      <output htmlFor="search-dialog-input">
        <div className="max-h-100 overflow-y-auto">
          {filteredTools.length > 0 ? (
            <ul ref={listRef} className="list-none">
              {filteredTools.map((tool, index) => (
                <li key={tool.name}>
                  <button
                    type="button"
                    onClick={() => handleToolSelection(tool)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={clsx(
                      `font-body text-text-foreground ease-hover hover:bg-hover-background w-full cursor-pointer border-0 border-none p-4 text-left text-base/snug transition-all duration-(--duration-hover)`,
                      index === selectedIndex && 'bg-active-background'
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{tool.name}</span>
                      {'url' in tool && (
                        <>
                          <span className="sr-only">(external link)</span>
                          <Icon icon="external" className="size-4" />
                        </>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="typo-body text-secondary-text-foreground p-4">
              No tools found
            </p>
          )}
        </div>
      </output>
    </Modal>
  );
}
