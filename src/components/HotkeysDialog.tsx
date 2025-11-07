import { Modal } from './Modal';
import { Heading } from './Heading';
import { Table } from './Table';
import { Stack } from './Stack';
import { getShortcut } from '../util/getShortcut';
import { css } from '../../styled-system/css';

interface HotkeysDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HotkeysDialog({ isOpen, onClose }: HotkeysDialogProps) {
  const globalHotkeys = [
    { key: getShortcut('K'), description: 'Search tools' },
    { key: getShortcut('/'), description: 'Toggle sidebar' },
    { key: 'F1', description: 'Show hotkeys (this dialog)' },
  ];

  const editorHotkeys = [
    { key: getShortcut('F'), description: 'Search' },
    { key: getShortcut('G'), description: 'Go to line' },
    { key: 'Alt+Enter', description: 'Toggle fullscreen' },
    { key: 'Escape', description: 'Exit fullscreen' },
  ];

  return (
    <Modal
      id="hotkey-dialog"
      label="Hotkeys"
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton
    >
      <Stack gap="l" p="l" overflow="auto">
        <Stack gap="m">
          <Heading level={2}>Global hotkeys</Heading>
          <Table variant="spacious">
            <thead>
              <tr>
                <th className={css({ width: '5rem' })}>Key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {globalHotkeys.map(({ key, description }) => (
                <tr key={key}>
                  <td>
                    <strong>{key}</strong>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
        <Stack gap="m">
          <Heading level={2}>Editor hotkeys</Heading>
          <Table variant="spacious">
            <thead>
              <tr>
                <th className={css({ width: '5rem' })}>Key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {editorHotkeys.map(({ key, description }) => (
                <tr key={key}>
                  <td>
                    <strong>{key}</strong>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Stack>
    </Modal>
  );
}
