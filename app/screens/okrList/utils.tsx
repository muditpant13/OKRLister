import {getOkrEntryBgColor} from '../../utils';
import {
  OkrApiResposne,
  OKRViewData,
  OKRViewDataEntry,
  OkrViewDataItem,
} from './api/Models';

const okrViewDataMap = new Map();
const okrCategories = new Set();

const CATEGORY_ALL = 'All';

export const createOkrViewData = (okrReponse: OkrApiResposne): OKRViewData => {
  if (!okrReponse || !okrReponse.data || okrReponse.data.length === 0) {
    return {} as OKRViewData;
  }
  const {data} = okrReponse;
  // initialize empty array & clear map
  const okrViewData = {} as OKRViewData;
  okrViewData.viewData = [] as Array<OKRViewDataEntry>;
  okrViewData.categories = [] as Array<string>;
  okrViewDataMap.clear();
  okrCategories.clear();
  data.forEach((okrDataEntry, index) => {
    if (!okrDataEntry.parent_objective_id) {
      // this is a parent ojective
      const okrViewDataEntry = {} as OKRViewDataEntry;
      okrViewDataEntry.data = {
        ...okrDataEntry,
        bgColorStyle: getOkrEntryBgColor(index),
      } as OkrViewDataItem;
      okrViewDataEntry.childObjectives = [];
      // push the data to array & push entry to map
      okrViewData.viewData.push(okrViewDataEntry);
      okrViewDataMap.set(
        okrViewDataEntry.data.id,
        okrViewData.viewData.length - 1,
      );
      if (!okrCategories.has(okrDataEntry.category)) {
        okrCategories.add(okrDataEntry.category);
        okrViewData.categories.push(okrDataEntry.category);
      }
    } else {
      // get index of array
      if (okrViewDataMap.has(okrDataEntry.parent_objective_id)) {
        const parentIndex = okrViewDataMap.get(
          okrDataEntry.parent_objective_id,
        );
        const okrParentDataEntry = okrViewData.viewData[parentIndex];
        okrParentDataEntry.childObjectives?.push({
          ...okrDataEntry,
          bgColorStyle: getOkrEntryBgColor(index),
        } as OkrViewDataItem);
      }
    }
  });
  // add all categories to show all OKr's
  okrViewData.categories.unshift(CATEGORY_ALL);
  return okrViewData;
};

export const filterOkrViewData = (
  okrViewDataOriginal: Array<OKRViewDataEntry>,
  filterOption: string,
) => {
  if (filterOption === CATEGORY_ALL) {
    return okrViewDataOriginal;
  }
  return okrViewDataOriginal.filter((viewData) => {
    return viewData.data.category === filterOption;
  });
};
