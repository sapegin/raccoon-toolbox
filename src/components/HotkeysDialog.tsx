import { getShortcut } from '../util/getShortcut';
import { Modal } from './Modal';
import { Table } from './Table';

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
      <div className="flex flex-col gap-8 p-8 overflow-auto">
        <div className="flex flex-col gap-4">
          <h2 className="heading-2">Global hotkeys</h2>
          <Table variant="spacious">
            <thead>
              <tr>
                <th className="w-20">Key</th>
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
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="heading-2">Editor hotkeys</h2>
          <Table variant="spacious">
            <thead>
              <tr>
                <th className="w-20">Key</th>
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
        </div>
      </div>
    </Modal>
  );
}
