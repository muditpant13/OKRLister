import React, {PureComponent} from 'react';
import {
  StyleSheet,
  ImageStyle,
  StyleProp,
  ImageResizeMode,
  ViewStyle,
} from 'react-native';
import {default as ImageViewWrapper} from '../wrappers/ImageViewWrapper';
import {Spaces, getSpace} from '../../styles/spaces';
import {ImageResizeModes, getResizeMode} from '../../styles/imageResizeMode';

/* Ideal way is to let this component take all the space (don't pass height & width).
	Just Pass the aspect ratio
*/

const styles = StyleSheet.create({container: {flex: 1}});

export type AspectRatio = number | 'auto';

export const defaultProps = {
  imageMargin: Spaces.xSmall,
  resizeMode: ImageResizeModes.contain,
  aspectRatio: 1 as AspectRatio,
  width: 0,
  height: 0,
  disableFlex: false,
  ignoreAspectRatio: false,
};

export type ImageProps = {
  quality: any;
  width: any;
  height: any;
  aspectRatio: any;
};

export type ImageViewProps = {
  imageStyle?: StyleProp<ImageStyle>;
  sourceUri: string;
  children?: React.ReactElement | React.ReactNode;
  style?: StyleProp<ViewStyle>;
} & Partial<typeof defaultProps>;

export const getInitialState = (props: ImageViewProps) => {
  const {aspectRatio} = props;
  return {
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : 1,
  };
};

export type ImageViewState = ReturnType<typeof getInitialState>;

export class ImageView extends PureComponent<ImageViewProps, ImageViewState> {
  readonly state = getInitialState(this.props);
  static defaultProps = defaultProps;
  imageURI?: string;
  width?: number;
  height?: number;
  aspectRatio?: AspectRatio;

  constructor(props: ImageViewProps) {
    super(props);
    this.calculateImageSpecificDetails(this.props);
  }

  calculateImageSpecificDetails(props: ImageViewProps) {
    const {aspectRatio, sourceUri} = props;
    this.imageURI = sourceUri;
    if (aspectRatio === 'auto') {
      ImageViewWrapper.getSize(
        this.imageURI,
        (width: number, height: number) => {
          this.setState({aspectRatio: width / height});
        },
        (_: Error) => {},
      );
    } else if (aspectRatio) {
      this.setState({aspectRatio});
    }
  }

  render() {
    const {
      width,
      height,
      imageMargin,
      imageStyle,
      resizeMode,
      disableFlex,
      style,
    } = this.props;

    this.calculateImageSpecificDetails(this.props);

    if (!this.imageURI) return null;
    const margin = getSpace(imageMargin);
    return (
      <ImageViewWrapper
        source={{uri: this.imageURI}}
        resizeMode={getResizeMode(resizeMode) as ImageResizeMode}
        style={[
          disableFlex !== undefined && disableFlex === false
            ? styles.container
            : undefined,
          height ? {height} : undefined,
          width ? {width} : undefined,
          this.props.ignoreAspectRatio
            ? {}
            : {aspectRatio: this.state.aspectRatio},
          {margin},
          imageStyle && imageStyle,
          style,
        ]}
      />
    );
  }
}
