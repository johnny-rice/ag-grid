// Type definitions for @ag-grid-community/core v31.0.0
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { RowNode } from "../entities/rowNode";
import { SelectionEventSourceType } from "../events";
import { ChangedPath } from "../utils/changedPath";
import { ServerSideRowGroupSelectionState, ServerSideRowSelectionState } from "./selectionState";
export interface ISelectionService {
    getSelectionState(): string[] | ServerSideRowSelectionState | ServerSideRowGroupSelectionState | null;
    setSelectionState(state: string[] | ServerSideRowSelectionState | ServerSideRowGroupSelectionState, source: SelectionEventSourceType): void;
    getSelectedNodes(): RowNode<any>[];
    getSelectedRows(): any[];
    getSelectionCount(): number;
    setNodesSelected(params: ISetNodesSelectedParams): number;
    filterFromSelection(predicate: (node: RowNode) => boolean): void;
    updateGroupsFromChildrenSelections(source: SelectionEventSourceType, changedPath?: ChangedPath): boolean;
    syncInRowNode(rowNode: RowNode, oldNode: RowNode | null): void;
    reset(source: SelectionEventSourceType): void;
    getBestCostNodeSelection(): RowNode[] | undefined;
    isEmpty(): boolean;
    /**
     * @param justFiltered whether to just include nodes which have passed the filter
     * @param justCurrentPage whether to just include nodes on the current page
     * @returns all nodes including unselectable nodes which are the target of this selection attempt
     */
    getSelectAllState(justFiltered?: boolean, justCurrentPage?: boolean): boolean | null;
    selectAllRowNodes(params: {
        source: SelectionEventSourceType;
        justFiltered?: boolean;
        justCurrentPage?: boolean;
    }): void;
    deselectAllRowNodes(params: {
        source: SelectionEventSourceType;
        justFiltered?: boolean;
        justCurrentPage?: boolean;
    }): void;
}
interface INodeSelectionParams {
    newValue: boolean;
    clearSelection?: boolean;
    suppressFinishActions?: boolean;
    rangeSelect?: boolean;
    groupSelectsFiltered?: boolean;
    source: SelectionEventSourceType;
    event?: Event;
}
export interface ISetNodesSelectedParams extends INodeSelectionParams {
    nodes: RowNode[];
}
export {};
