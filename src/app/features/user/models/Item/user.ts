import { NzTableFilterFn, NzTableFilterList } from "ng-zorro-antd/table";
export interface ColumnItem {
  key: string;
  name: string;
  hidden: boolean;
  sortFn?: any;
  col?: number;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<any> | null;
  isShow?: boolean;
  align?: "center" | "left" | "right";
  isRequired?: boolean;
  compare?: any,
  priority?: boolean,
  width?: string;
}
