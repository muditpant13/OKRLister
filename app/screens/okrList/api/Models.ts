import {ViewStyle} from 'react-native';

export type OkrApiResposne = {
  data: Array<OkrData>;
};

export type OkrData = {
  id: string;
  category: string;
  title: string;
  metric_name: string;
  metric_start: string;
  metric_target: string;
  parent_objective_id: string;
  archived: string;
};

export type OKRViewData = {
  viewData: Array<OKRViewDataEntry>;
  categories: Array<string>;
};

export type OkrViewDataItem = {
  id: string;
  category: string;
  title: string;
  metric_name: string;
  metric_start: string;
  metric_target: string;
  parent_objective_id: string;
  archived: string;
  bgColorStyle: ViewStyle;
};

export type OKRViewDataEntry = {
  data: OkrViewDataItem;
  childObjectives?: Array<OkrViewDataItem>;
};
