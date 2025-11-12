"use client"

import { useMemo, useRef, useEffect } from "react"
import { Network } from "vis-network"
import { Data, Options } from "vis-network"
import { ExperienceItem } from "@/content/data/types"

interface ProjectGraphProps {
  projects: ExperienceItem[]
  onProjectClick: (project: ExperienceItem) => void
}

function flattenProjects(items: ExperienceItem[]): ExperienceItem[] {
  const flat: ExperienceItem[] = []
  items.forEach((item) => {
    if (item.nested) {
      flat.push(...flattenProjects(item.nested))
    } else if (!item.isProjectCategory) {
      flat.push(item)
    }
  })
  return flat
}

export function ProjectGraph({ projects, onProjectClick }: ProjectGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<Network | null>(null)
  const flatProjects = useMemo(() => flattenProjects(projects), [projects])

  const graphData = useMemo(() => {
    const nodes: Array<{
      id: string
      label?: string
      x?: number
      y?: number
      size: number
      color: string
      clusterId: string
      project: ExperienceItem
      isLabel?: boolean
    }> = []
    const edges: Array<{ from: string; to: string; id?: string }> = []
    const clusterData: Map<
      string,
      { centerX: number; centerY: number; offsets: Map<string, { x: number; y: number }> }
    > = new Map()

    const colors = [
      "rgba(37, 99, 235, 0.65)", // blue
      "rgba(16, 185, 129, 0.65)", // green
      "rgba(245, 158, 11, 0.65)", // orange
      "rgba(139, 92, 246, 0.65)", // purple
      "rgba(239, 68, 68, 0.65)", // red
      "rgba(251, 191, 36, 0.65)", // yellow/amber
      "rgba(6, 182, 212, 0.65)", // cyan
      "rgba(236, 72, 153, 0.65)", // pink
    ]

    flatProjects.forEach((project, projectIndex) => {
      const nodesPerCluster = 80
      const clusterColor = colors[projectIndex % colors.length]
      const clusterId = project.id

      // Create organic position for this cluster - random but spread out
      const seed = projectIndex * 137.508 // golden angle for better distribution
      const angle = seed + Math.random() * 0.5
      const radius = 300 + Math.random() * 500
      const centerX = Math.cos(angle) * radius
      const centerY = Math.sin(angle) * radius

      // Initialize cluster data
      const offsets = new Map<string, { x: number; y: number }>()
      clusterData.set(clusterId, { centerX, centerY, offsets })

      // Create nodes for this cluster
      for (let i = 0; i < nodesPerCluster; i++) {
        // Use gaussian distribution for more organic clustering
        const r = Math.sqrt(-2 * Math.log(Math.random())) * 60
        const theta = Math.random() * 2 * Math.PI
        const offsetX = r * Math.cos(theta)
        const offsetY = r * Math.sin(theta)

        const nodeId = `${clusterId}_node_${i}`
        offsets.set(nodeId, { x: offsetX, y: offsetY })

        nodes.push({
          id: nodeId,
          x: centerX + offsetX,
          y: centerY + offsetY,
          size: 6 + Math.random() * 4,
          color: clusterColor,
          clusterId: clusterId,
          project: project,
        })

        // Connect some nodes within the cluster
        if (i > 0 && Math.random() > 0.7) {
          const targetIndex = Math.floor(Math.random() * i)
          edges.push({
            from: `${clusterId}_node_${i}`,
            to: `${clusterId}_node_${targetIndex}`,
          })
        }
      }

      // Add label node offset from cluster center
      const labelId = `${clusterId}_label`
      offsets.set(labelId, { x: 100, y: -80 })
      nodes.push({
        id: labelId,
        label: project.title,
        x: centerX + 100,
        y: centerY - 80,
        size: 1,
        color: "transparent",
        clusterId: clusterId,
        project: project,
        isLabel: true,
      })
    })

    // Add central hub node
    nodes.push({
      id: "central_hub",
      label: "",
      x: 0,
      y: 0,
      size: 8,
      color: "rgba(100, 116, 139, 0.4)",
      clusterId: "hub",
      project: flatProjects[0], // dummy project
      isLabel: false,
    })

    // Connect each cluster to the central hub with a subtle connection
    flatProjects.forEach((project) => {
      const clusterId = project.id
      const randomNodeInCluster = `${clusterId}_node_${Math.floor(Math.random() * 80)}`
      edges.push({
        id: `${randomNodeInCluster}-central_hub`,
        from: randomNodeInCluster,
        to: "central_hub",
      })
    })

    return { nodes, edges, clusterData }
  }, [flatProjects])

  useEffect(() => {
    if (!containerRef.current || graphData.nodes.length === 0) return

    const options: Options = {
      nodes: {
        shape: "dot",
        borderWidth: 0,
        shadow: false,
        font: {
          size: 24,
          color: "#1f2937",
          face: "Arial",
          bold: "700",
        },
        scaling: {
          min: 10,
          max: 30,
        },
      },
      edges: {
        color: {
          color: "rgba(100, 116, 139, 0.25)",
          highlight: "rgba(100, 116, 139, 0.4)",
        },
        width: 0.8,
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.3,
        },
      },
        interaction: {
          hover: true,
          tooltipDelay: 200,
          selectConnectedEdges: false,
          zoomView: true,
          dragView: true,
          dragNodes: true,
          navigationButtons: false,
          keyboard: false,
        },
      physics: {
        enabled: false,
      },
    }

    const data: Data = {
      nodes: graphData.nodes,
      edges: graphData.edges,
    }

    networkRef.current = new Network(containerRef.current, data, options)

    // Track clicked clusters to prevent duplicate clicks
    const clickedClusters = new Set<string>()
    let draggedCluster: string | null = null
    let dragStartPositions: Map<string, { x: number; y: number }> = new Map()

    networkRef.current.on("click", (params) => {
      // Handle edge clicks
      if (params.edges.length > 0) {
        const edgeId = params.edges[0]
        const edge = graphData.edges.find((e) => `${e.from}-${e.to}` === edgeId || `${e.to}-${e.from}` === edgeId)
        if (edge) {
          // Find the projects connected by this edge
          const fromNode = graphData.nodes.find((n) => n.id === edge.from)
          const toNode = graphData.nodes.find((n) => n.id === edge.to)
          
          if (fromNode && toNode && fromNode.clusterId !== "hub" && toNode.clusterId !== "hub") {
            // Show info about the connection between two projects
            alert(`Connection between ${fromNode.project.title} and ${toNode.project.title}`)
          }
        }
      }
      // Handle node clicks
      else if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]
        const node = graphData.nodes.find((n) => n.id === nodeId)
        if (node && !clickedClusters.has(node.clusterId)) {
          clickedClusters.add(node.clusterId)
          onProjectClick(node.project)
          // Reset after a short delay to allow clicking again
          setTimeout(() => clickedClusters.delete(node.clusterId), 300)
        }
      }
    })

    // Handle cluster dragging - move entire cluster as one unit
    networkRef.current.on("dragStart", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]
        const node = graphData.nodes.find((n) => n.id === nodeId)
        if (node) {
          draggedCluster = node.clusterId
          const clusterInfo = graphData.clusterData.get(draggedCluster)
          if (clusterInfo) {
            dragStartPositions.set("clusterCenter", { x: clusterInfo.centerX, y: clusterInfo.centerY })
          }
        }
      }
    })

    networkRef.current.on("dragging", (params) => {
      if (draggedCluster && params.nodes.length > 0 && draggedCluster !== "hub") {
        const draggedNodeId = params.nodes[0]
        const currentPos = networkRef.current?.getPosition(draggedNodeId)
        const clusterInfo = graphData.clusterData.get(draggedCluster)
        const startCenter = dragStartPositions.get("clusterCenter")
        
        if (currentPos && clusterInfo && startCenter) {
          // Calculate the offset of the dragged node from its cluster center
          const draggedNodeOffset = clusterInfo.offsets.get(draggedNodeId)
          if (draggedNodeOffset) {
            // Calculate new cluster center
            const newCenterX = currentPos.x - draggedNodeOffset.x
            const newCenterY = currentPos.y - draggedNodeOffset.y
            
            // Move all nodes in the cluster to maintain their relative positions
            graphData.nodes.forEach((n) => {
              if (n.clusterId === draggedCluster) {
                const offset = clusterInfo.offsets.get(n.id)
                if (offset) {
                  networkRef.current?.moveNode(n.id, newCenterX + offset.x, newCenterY + offset.y)
                }
              }
            })
            
            // Update cluster center for next frame
            clusterInfo.centerX = newCenterX
            clusterInfo.centerY = newCenterY
          }
        }
      }
    })

    networkRef.current.on("dragEnd", () => {
      draggedCluster = null
      dragStartPositions.clear()
    })

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [graphData, onProjectClick])

  return (
    <div className="w-full h-full bg-white relative">
      <div ref={containerRef} className="w-full h-full" style={{ backgroundColor: "white" }} />
        <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-white/90 px-2 py-1 rounded shadow-sm z-10">
          Click clusters to view details • Drag to rearrange • Scroll to zoom
        </div>
    </div>
  )
}
