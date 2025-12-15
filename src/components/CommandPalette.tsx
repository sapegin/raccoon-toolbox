import { isTauri } from '@tauri-apps/api/core';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '../../styled-system/css';
import { Box, styled, VisuallyHidden } from '../../styled-system/jsx';
import { externalTools } from '../externalTools';
import { tools } from '../tools';
import { Icon } from './Icon';
import { Modal } from './Modal';
import { Text } from './Text';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchInput = styled('input', {
  base: {
    width: '100%',
    padding: 'm',
    fontSize: 'm',
    fontFamily: 'body',
    color: 'textForeground',
    backgroundColor: 'textBackground',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    borderColor: 'lightBorder',
    outline: 'none',
    _placeholder: {
      color: 'secondaryTextForeground',
    },
    _focusVisible: {
      // No focus style as it's always in focus
      outline: 'none',
    },
  },
});

const CommandButton = styled('button', {
  base: {
    width: '100%',
    padding: 'm',
    textAlign: 'left',
    fontFamily: 'body',
    fontSize: 'm',
    cursor: 'pointer',
    color: 'textForeground',
    border: 'none',
    borderWidth: 0,
    _hover: {
      backgroundColor: 'hoverBackground',
    },
  },
});

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
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setSearchQuery('');
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setSelectedIndex(0);
      const timeoutId = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset selection index when search query changes
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
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
      <SearchInput
        ref={inputRef}
        id="search-dialog-input"
        type="text"
        aria-label="Search tools"
        placeholder="Search tools…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <output htmlFor="search-dialog-input">
        <Box maxHeight="400px" overflowY="auto">
          {filteredTools.length > 0 ? (
            <ul
              ref={listRef}
              className={css({
                listStyle: 'none',
              })}
            >
              {filteredTools.map((tool, index) => (
                <li key={tool.name}>
                  <CommandButton
                    type="button"
                    onClick={() => handleToolSelection(tool)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    backgroundColor={
                      index === selectedIndex
                        ? 'activeBackground'
                        : 'transparent'
                    }
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <span>{tool.name}</span>
                      {'url' in tool && (
                        <>
                          <VisuallyHidden as="span">
                            (external link)
                          </VisuallyHidden>
                          <Icon icon="external" size={16} />
                        </>
                      )}
                    </Box>
                  </CommandButton>
                </li>
              ))}
            </ul>
          ) : (
            <Text p="m" color="secondaryTextForeground">
              No tools found
            </Text>
          )}
        </Box>
      </output>
    </Modal>
  );
}
