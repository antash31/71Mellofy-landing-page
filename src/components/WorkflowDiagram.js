"use client";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";

const initialNodes = [
  // Main workflow path - center column
  {
    id: "1",
    type: "custom",
    position: { x: 300, y: 0 },
    data: {
      title: "Lead Intake",
      description:
        "New leads are captured from various sources such as your CRM, website forms, or manual uploads.",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 300, y: 180 },
    data: {
      title: "Data Enrichment",
      description:
        "Raw lead data is automatically enriched by gathering additional information from multiple sources.",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 300, y: 360 },
    data: {
      title: "Smart Lead Scoring",
      description:
        "Leads are evaluated against your ICP using a scoring algorithm.",
    },
  },
  {
    id: "4",
    type: "decision",
    position: { x: 300, y: 540 },
    data: {
      title: "Qualification Check",
      description: "Leads are filtered based on their score.",
    },
  },
  // Rejected leads path - right side
  {
    id: "12",
    type: "custom",
    position: { x: 650, y: 540 },
    data: {
      title: "Analytics & Reporting",
      description: "All interactions and metrics are tracked in real time.",
    },
  },
  // Continue main path
  {
    id: "5",
    type: "custom",
    position: { x: 300, y: 720 },
    data: {
      title: "Context-Aware Message Generation",
      description: "System generates highly personalized outreach messages.",
    },
  },
  {
    id: "6",
    type: "decision",
    position: { x: 300, y: 900 },
    data: {
      title: "Human Review",
      description: "Optional review for approval or fine-tuning.",
    },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 300, y: 1080 },
    data: {
      title: "Outreach Sending",
      description:
        "Personalized messages are sent using warmed-up, authenticated accounts.",
    },
  },
  {
    id: "8",
    type: "custom",
    position: { x: 300, y: 1260 },
    data: {
      title: "Response Capture",
      description: "Incoming replies are automatically captured and parsed.",
    },
  },
  {
    id: "9",
    type: "custom",
    position: { x: 300, y: 1440 },
    data: {
      title: "Response Intelligence",
      description: "Responses are analyzed using AI to determine intent.",
    },
  },
  {
    id: "10",
    type: "decision",
    position: { x: 300, y: 1620 },
    data: {
      title: "Next-Best-Action",
      description: "System recommends optimal next steps based on response.",
    },
  },
  // Human escalation - right side
  {
    id: "11",
    type: "custom",
    position: { x: 650, y: 1440 },
    data: {
      title: "Human Escalation",
      description: "Complex responses are handled by human representatives.",
    },
  },
];

const initialEdges = [
  // Main workflow path
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },

  // Qualification Check paths
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    label: "✓ Qualified",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
    labelStyle: { fill: "#10b981", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
  },
  {
    id: "e4-12",
    source: "4",
    target: "12",
    type: "smoothstep",
    label: "✗ Not Qualified",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
    labelStyle: { fill: "#ef4444", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-right",
    targetHandle: "target-left",
  },

  // Continue main flow
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },

  // Human Review paths
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    label: "✓ Approved",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
    labelStyle: { fill: "#10b981", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
  },
  {
    id: "e6-5",
    source: "6",
    target: "5",
    type: "smoothstep",
    label: "↺ Needs Revision",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f59e0b" },
    labelStyle: { fill: "#f59e0b", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-left",
    targetHandle: "target-left",
  },

  // Continue main flow
  {
    id: "e7-8",
    source: "7",
    target: "8",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },

  // Next-Best-Action paths
  {
    id: "e10-11",
    source: "10",
    target: "11",
    type: "smoothstep",
    label: "🔥 Complex Response",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f59e0b" },
    labelStyle: { fill: "#f59e0b", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-right",
    targetHandle: "target-bottom",
  },
  {
    id: "e10-12",
    source: "10",
    target: "12",
    type: "smoothstep",
    label: "✓ Standard Response",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#10b981" },
    labelStyle: { fill: "#10b981", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-right",
    targetHandle: "target-bottom",
  },

  // Human Escalation feedback loop
  {
    id: "e11-9",
    source: "11",
    target: "9",
    type: "smoothstep",
    label: "↺ Back to Intelligence",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    labelStyle: { fill: "#8b5cf6", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-left",
    targetHandle: "target-right",
  },

  // Learning feedback loop from Analytics back to Lead Scoring
  {
    id: "e12-3",
    source: "12",
    target: "3",
    type: "smoothstep",
    label: "📊 Learning Loop",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "5 5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#8b5cf6" },
    labelStyle: { fill: "#8b5cf6", fontWeight: "bold" },
    labelBgStyle: { fill: "rgba(0,0,0,0.8)", rx: 4, ry: 4 },
    sourceHandle: "source-left",
    targetHandle: "target-right",
  },
];

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div className="relative group">
      {/* Multiple handles for better edge routing */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        style={{ background: "#555" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-4 min-w-[320px] max-w-[320px] group-hover:border-white/20 transition-all duration-300">
        <h3 className="font-cormorant text-xl text-white mb-2">{data.title}</h3>
        <p className="font-montserrat text-sm text-white/60 leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Source handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        style={{ background: "#555" }}
      />
    </div>
  );
};

// Decision Node Component
const DecisionNode = ({ data }) => {
  return (
    <div className="relative group">
      {/* Multiple handles for better edge routing */}
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        style={{ background: "#555" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        style={{ background: "#555" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-4 min-w-[320px] max-w-[320px] group-hover:border-white/20 transition-all duration-300">
        <h3 className="font-cormorant text-xl text-white mb-2">{data.title}</h3>
        <p className="font-montserrat text-sm text-white/60 leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Source handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        style={{ background: "#555" }}
      />
    </div>
  );
};

// Define nodeTypes outside component to prevent recreation
const nodeTypes = {
  custom: CustomNode,
  decision: DecisionNode,
};

export default function WorkflowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance) => {
    reactFlowInstance.fitView({ duration: 400 });
  }, []);

  return (
    <div className="w-full h-[1000px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        nodesDraggable={false}
        zoomOnScroll={false}
        zoomOnPinch={true}
        preventScrolling={false}
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        className="bg-transparent [&_.react-flow__viewport]:transition-transform [&_.react-flow__viewport]:duration-200"
      >
        <Background
          color="#4b5563"
          variant="dots"
          className="opacity-30 !fixed"
          gap={20}
          size={1}
        />
        <Controls
          className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-lg p-2 shadow-xl"
          showZoom={true}
          showFitView={true}
        />
        <Panel
          position="top-left"
          className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-lg p-4 m-4 shadow-xl"
        >
          <h2 className="font-cormorant text-2xl text-white mb-2">
            AI SDR Workflow
          </h2>
          <p className="font-montserrat text-sm text-white/70">
            Interactive workflow visualization with decision paths
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
}
