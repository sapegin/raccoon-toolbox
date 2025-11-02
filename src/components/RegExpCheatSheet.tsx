import { Fragment } from 'react';
import { Table } from './Table';
import { Panel } from './Panel';
import { Text } from './Text';
import { Box } from './Box';

const cheatSheetData = [
  {
    section: 'Character classes',
    items: [
      { description: 'Any character except newline', syntax: '.' },
      { description: 'Word character', syntax: String.raw`\w` },
      { description: 'Non-word character', syntax: String.raw`\W` },
      { description: 'Digit', syntax: String.raw`\d` },
      { description: 'Non-digit', syntax: String.raw`\D` },
      { description: 'Whitespace', syntax: String.raw`\s` },
      { description: 'Non-whitespace', syntax: String.raw`\S` },
      { description: 'Character set', syntax: '[abc]' },
      { description: 'Negated set', syntax: '[^abc]' },
      { description: 'Range', syntax: '[a-z]' },
    ],
  },
  {
    section: 'Anchors',
    items: [
      { description: 'Start of string', syntax: '^' },
      { description: 'End of string', syntax: '$' },
      { description: 'Word boundary', syntax: String.raw`\b` },
      { description: 'Non-word boundary', syntax: String.raw`\B` },
    ],
  },
  {
    section: 'Groups & references',
    items: [
      { description: 'Capturing group', syntax: '(abc)' },
      { description: 'Non-capturing group', syntax: '(?:abc)' },
      { description: 'Named capturing group', syntax: '(?<name>abc)' },
      { description: 'Backreference', syntax: String.raw`\1` },
      { description: 'Named backreference', syntax: String.raw`\k<name>` },
    ],
  },
  {
    section: 'Lookaround',
    items: [
      { description: 'Positive lookahead', syntax: '(?=abc)' },
      { description: 'Negative lookahead', syntax: '(?!abc)' },
      { description: 'Positive lookbehind', syntax: '(?<=abc)' },
      { description: 'Negative lookbehind', syntax: '(?<!abc)' },
    ],
  },
  {
    section: 'Quantifiers',
    items: [
      { description: 'Zero or one', syntax: '?' },
      { description: 'Zero or more', syntax: '*' },
      { description: 'One or more', syntax: '+' },
      { description: 'Exactly N', syntax: '{N}' },
      { description: 'N or more', syntax: '{N,}' },
      { description: 'Between N and M', syntax: '{N,M}' },
      { description: 'Lazy quantifier', syntax: '*?, +?, ??' },
    ],
  },
  {
    section: 'Alternation',
    items: [{ description: 'Or', syntax: 'a|b' }],
  },
  {
    section: 'Flags',
    items: [
      { description: 'Global', syntax: 'g' },
      { description: 'Case insensitive', syntax: 'i' },
      { description: 'Multiline', syntax: 'm' },
      { description: 'Dot matches newline', syntax: 's' },
      { description: 'Unicode', syntax: 'u' },
      { description: 'Sticky', syntax: 'y' },
    ],
  },
  {
    section: 'Match formatters',
    items: [
      { description: 'Full match', syntax: '$0' },
      { description: 'Capture group', syntax: '$1' },
    ],
  },
];

export function RegExpCheatSheet() {
  return (
    <Panel fullHeight label="Cheat sheet">
      <Box overflowY="auto" height="100%">
        <Table variant="dense">
          <thead>
            <tr>
              <th>Description</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            {cheatSheetData.map(({ section, items }) => (
              <Fragment key={section}>
                <tr>
                  <th colSpan={2}>
                    <Text mt="m" variant="bold">
                      {section}
                    </Text>
                  </th>
                </tr>
                {items.map(({ description, syntax }) => (
                  <tr key={description}>
                    <td>
                      <Text>{description}</Text>
                    </td>
                    <td>
                      <Text as="code" variant="code">
                        {syntax}
                      </Text>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Box>
    </Panel>
  );
}
