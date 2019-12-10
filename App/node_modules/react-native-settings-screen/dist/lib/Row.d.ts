import * as React from 'react';
import { TextStyle } from 'react-native';
export interface RowData {
    title: string;
    titleStyle?: TextStyle;
    subtitle?: string;
    subtitleStyle?: TextStyle;
    onPress?: () => void;
    showDisclosureIndicator?: boolean;
    renderAccessory?: () => React.ReactElement<any>;
}
export interface Props extends RowData {
    titleStyles?: (TextStyle | undefined)[];
    subtitleStyles?: (TextStyle | undefined)[];
    isFirst: boolean;
    isLast: boolean;
    children?: any;
}
export declare const Row: ({ title, subtitle, onPress, showDisclosureIndicator, renderAccessory, titleStyles, subtitleStyles, isFirst, isLast, }: Props) => JSX.Element;
