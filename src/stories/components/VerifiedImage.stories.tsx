import { VerifiedImage } from '../../components/verified/VerifiedImage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Components/VerifiedImage',
  component: VerifiedImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    themeLight: { control: { type: 'color' } },
    themeMain: { control: { type: 'color' } },
    themeDark: { control: { type: 'color' } },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

const Template = ({ themeLight, themeMain, themeDark, ...args }: any) => (
  <VerifiedImage
    {...args}
    theme={{ light: themeLight, main: themeMain, dark: themeDark }}
  />
);

export const Default: any = Template.bind({});
Default.args = {
  themeLight: '#0DBC3D',
  themeMain: '#0DBC3D',
  themeDark: '#0DBC3D',
};
