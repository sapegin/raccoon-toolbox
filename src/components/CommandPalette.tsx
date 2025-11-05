import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { tools } from '../tools';
import { Box } from './Box';
import { useHotkey } from '../hooks/useHotkey';
import { css } from '../../styled-system/css';
import { Text } from './Text';
import { styled } from '../../styled-system/jsx';
import { Icon } from './Icon';
import { externalTools } from '../externalTools';

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

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const query = searchQuery.toLowerCase();
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(query))
  );
  const filteredExternalTools = externalTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(query))
  );
  const allFilteredTools = [...filteredTools, ...filteredExternalTools];

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
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

  useHotkey(onClose, {
    enabled: isOpen,
    key: 'Escape',
  });

  const handleToolSelection = (tool: (typeof allFilteredTools)[0]) => {
    if ('url' in tool) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    } else {
      void navigate(`/${tool.id}/`);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < allFilteredTools.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && allFilteredTools[selectedIndex]) {
      e.preventDefault();
      handleToolSelection(allFilteredTools[selectedIndex]);
    }
  };

  if (isOpen === false) {
    return null;
  }

  return (
    <>
      <Box position="fixed" inset={0} zIndex={999} onClick={onClose} />
      <Box
        position="fixed"
        top="10vh"
        left="50%"
        transform="translateX(-50%)"
        width="90%"
        maxWidth="600px"
        backgroundColor="uiBackground"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="lightBorder"
        borderRadius="xlarge"
        boxShadow="0 0 1rem #0002"
        zIndex={999}
        overflow="hidden"
      >
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="Search tools…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Box maxHeight="400px" overflowY="auto">
          {allFilteredTools.length > 0 ? (
            <ul
              ref={listRef}
              className={css({
                listStyle: 'none',
              })}
            >
              {allFilteredTools.map((tool, index) => (
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
                      {'url' in tool && <Icon icon="external" size={16} />}
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
      </Box>
    </>
  );
}
