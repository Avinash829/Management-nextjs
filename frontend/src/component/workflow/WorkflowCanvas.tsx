/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
    useCallback,
    useImperativeHandle,
    forwardRef,
    useState,
} from "react";
import {
    addEdge,
    Connection,
    ConnectionLineType,
    useNodesState,
    useEdgesState,
    Position,
    Handle,
    ReactFlow,
    MarkerType,
    EdgeProps,
    getStraightPath,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./xyflow-theme.css";

function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
}: EdgeProps) {
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            fill="none"
            markerEnd={markerEnd}
        />
    );
}

const CustomNode = ({ data }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    const handleDoubleClick = () => setIsEditing(true);
    const handleBlur = () => {
        setIsEditing(false);
        data.label = label || "Untitled Task";
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleBlur();
    };

    return (
        <div
            onDoubleClick={handleDoubleClick}
            className="bg-white text-[#0D062D] px-6 py-3 rounded-[25px] shadow-md text-center w-48 border border-gray-100 break-words overflow-hidden"
        >
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-transparent !border-none !w-0 !h-0"
            />
            {isEditing ? (
                <input
                    className="bg-transparent border-b border-gray-300 outline-none text-center w-full text-[15px]"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
            ) : (
                <div className="font-medium text-[15px] whitespace-normal break-words">
                    {label}
                </div>
            )}
            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-transparent !border-none !w-0 !h-0"
            />
        </div>
    );
};

const NoteNode = ({ data }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    const handleDoubleClick = () => setIsEditing(true);
    const handleBlur = () => {
        setIsEditing(false);
        data.label = label || "Untitled Note";
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleBlur();
    };

    return (
        <div
            onDoubleClick={handleDoubleClick}
            className="bg-gray-200 text-[#0D062D] px-6 py-3 rounded-[25px] shadow-md text-center w-48 border border-gray-200 break-words overflow-hidden"
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-transparent !border-none !w-0 !h-0"
            />
            {isEditing ? (
                <input
                    className="bg-transparent border-b border-gray-400 outline-none text-center w-full text-[15px]"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
            ) : (
                <div className="font-medium text-[15px] whitespace-normal break-words">
                    {label}
                </div>
            )}
            <Handle
                type="source"
                position={Position.Right}
                className="!bg-transparent !border-none !w-0 !h-0"
            />
        </div>
    );
};

const nodeTypes = {
    customNode: CustomNode,
    noteNode: NoteNode,
};

const edgeTypes = {
    customEdge: CustomEdge,
};

import type { Node, Edge } from "@xyflow/react";

const WorkflowCanvas = forwardRef((_, ref) => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { getViewport } = useReactFlow();

    const onConnect = useCallback(
        (connection: Connection) => {
            if (!connection.source || !connection.target) return;

            const alreadyExists = edges.some(
                (e) =>
                    e.source === connection.source &&
                    e.target === connection.target
            );
            if (alreadyExists) return;

            const newEdge: Edge = {
                ...connection,
                id: `e${connection.source}-${connection.target}`,
                type: "customEdge",
                markerEnd: { type: MarkerType.Arrow },
            };

            setEdges((eds) => addEdge(newEdge, eds));
        },
        [edges, setEdges]
    );

    const addTaskNode = useCallback(() => {
        setNodes((nds) => [
            ...nds,
            {
                id: `task-${nds.length + 1}`,
                type: "customNode",
                position: {
                    x: 250,
                    y: 100 + nds.length * 120,
                },
                data: { label: `Task ${nds.length + 1}` },
            },
        ]);
    }, [setNodes]);

    const addNoteNode = useCallback(() => {
        setNodes((nds) => [
            ...nds,
            {
                id: `note-${nds.length + 1}`,
                type: "noteNode",
                position: {
                    x: 450,
                    y: 100 + nds.length * 100,
                },
                data: { label: `Note ${nds.length + 1}` },
            },
        ]);
    }, [setNodes]);

    useImperativeHandle(ref, () => ({
        addTaskNode,
        addNoteNode,
    }));

    return (
        <div className="w-full h-[90vh] relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.Straight}
                fitView
            ></ReactFlow>
        </div>
    );
});

WorkflowCanvas.displayName = "WorkflowCanvas";
export default WorkflowCanvas;
