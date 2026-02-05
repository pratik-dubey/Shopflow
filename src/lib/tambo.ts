// /**
//  * @file tambo.ts
//  * @description Central configuration file for Tambo components and tools
//  *
//  * This file serves as the central place to register your Tambo components and tools.
//  * It exports arrays that will be used by the TamboProvider.
//  *
//  * Read more about Tambo at https://tambo.co/docs
//  */

// import { Graph, graphSchema } from "@/components/tambo/graph";
// import { DataCard, dataCardSchema } from "@/components/ui/card-data";
// import {
//   getCountryPopulations,
//   getGlobalPopulationTrend,
// } from "@/services/population-stats";
// import type { TamboComponent } from "@tambo-ai/react";
// import { TamboTool } from "@tambo-ai/react";
// import { z } from "zod";

// /**
//  * tools
//  *
//  * This array contains all the Tambo tools that are registered for use within the application.
//  * Each tool is defined with its name, description, and expected props. The tools
//  * can be controlled by AI to dynamically fetch data based on user interactions.
//  */

// export const tools: TamboTool[] = [
//   {
//     name: "countryPopulation",
//     description:
//       "A tool to get population statistics by country with advanced filtering options",
//     tool: getCountryPopulations,
//     inputSchema: z.object({
//       continent: z.string().optional(),
//       sortBy: z.enum(["population", "growthRate"]).optional(),
//       limit: z.number().optional(),
//       order: z.enum(["asc", "desc"]).optional(),
//     }),
//     outputSchema: z.array(
//       z.object({
//         countryCode: z.string(),
//         countryName: z.string(),
//         continent: z.enum([
//           "Asia",
//           "Africa",
//           "Europe",
//           "North America",
//           "South America",
//           "Oceania",
//         ]),
//         population: z.number(),
//         year: z.number(),
//         growthRate: z.number(),
//       }),
//     ),
//   },
//   {
//     name: "globalPopulation",
//     description:
//       "A tool to get global population trends with optional year range filtering",
//     tool: getGlobalPopulationTrend,
//     inputSchema: z.object({
//       startYear: z.number().optional(),
//       endYear: z.number().optional(),
//     }),
//     outputSchema: z.array(
//       z.object({
//         year: z.number(),
//         population: z.number(),
//         growthRate: z.number(),
//       }),
//     ),
//   },
//   // Add more tools here
// ];

// /**
//  * components
//  *
//  * This array contains all the Tambo components that are registered for use within the application.
//  * Each component is defined with its name, description, and expected props. The components
//  * can be controlled by AI to dynamically render UI elements based on user interactions.
//  */
// export const components: TamboComponent[] = [
//   {
//     name: "Graph",
//     description:
//       "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
//     component: Graph,
//     propsSchema: graphSchema,
//   },
//   {
//     name: "DataCard",
//     description:
//       "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
//     component: DataCard,
//     propsSchema: dataCardSchema,
//   },
//   // Add more components here
// ];





/**
 * @file tambo.ts
 * @description Central configuration file for ShopFlow Tambo components
 *
 * This file registers all ShopFlow components with Tambo for Generative UI.
 * The AI will use these component definitions to decide what to render.
 */

import type { TamboComponent } from "@tambo-ai/react";
import { z } from "zod";

// Import ShopFlow components
import ProductGrid from "@/components/shopflow/ProductGrid";
import PriceFilter from "@/components/shopflow/PriceFilter";
import ComparisonTable from "@/components/shopflow/ComparisonTable";
import ReviewCard from "@/components/shopflow/ReviewCard";
import PolicyCard from "@/components/shopflow/PolicyCard";
import CheckoutCard from "@/components/shopflow/CheckoutCard";
import CartSummary from "@/components/shopflow/CartSummary";

/**
 * ShopFlow Components for Tambo
 *
 * Each component is registered with:
 * - name: Unique identifier for the component
 * - description: Detailed description for AI to understand when to use it
 * - component: The React component to render
 * - propsSchema: Zod schema defining the component's props
 */
export const components: TamboComponent[] = [
  {
    name: "ProductGrid",
    description: `A responsive grid of product cards displaying images, titles, prices, star ratings, 
      and 'Add to Cart' buttons. Use this component when the user wants to:
      - Browse products or see what's available
      - View items in a specific category (electronics, jewelry, clothing)
      - Search for products
      - See product listings
      Trigger phrases: "show products", "browse", "what do you have", "show me electronics", 
      "jewelry", "clothing", "items", "catalog"`,
    component: ProductGrid,
    propsSchema: z.object({
      category: z
        .string()
        .optional()
        .describe("Product category: electronics, jewelery, men's clothing, women's clothing"),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of products to display"),
      searchQuery: z
        .string()
        .optional()
        .describe("Search query to filter products by title or description"),
    }),
  },
  {
    name: "PriceFilter",
    description: `An interactive price range slider that filters products by maximum price.
      Shows real-time count of matching products and quick filter buttons.
      Use this component when the user mentions:
      - Budget constraints ("I have $50", "under $100")
      - Price ranges ("between $20 and $50")
      - Affordability ("cheap", "affordable", "expensive", "budget")
      - Price filtering ("filter by price", "price range")
      Trigger phrases: "budget", "under $X", "less than", "cheap", "affordable", "price filter"`,
    component: PriceFilter,
    propsSchema: z.object({
      initialMax: z
        .number()
        .optional()
        .describe("Initial maximum price value for the slider"),
    }),
  },
  {
    name: "ComparisonTable",
    description: `A side-by-side comparison table showing multiple products with their prices,
      ratings, categories, and action buttons. Highlights the best values.
      ONLY use this component when the user EXPLICITLY asks to:
      - Compare products ("compare these", "what's the difference")
      - See top rated items ("top 3", "best rated", "highest rated")
      - Make a decision between products ("which is better", "versus")
      Do NOT use for general browsing.
      Trigger phrases: "compare", "top rated", "best", "versus", "difference", "which one"`,
    component: ComparisonTable,
    propsSchema: z.object({
      showTopRated: z
        .boolean()
        .optional()
        .describe("If true, shows top rated products from catalog instead of comparison list"),
      topCount: z
        .number()
        .optional()
        .describe("Number of top rated products to show (default: 3)"),
    }),
  },
  {
    name: "ReviewCard",
    description: `Displays customer reviews and ratings for a product including:
      - Overall rating with stars
      - Rating distribution chart
      - Individual review cards with author, date, content
      - Helpful vote counts
      Use when the user asks about:
      - Product quality or reviews
      - Customer feedback or ratings
      - Whether a product is good
      Trigger phrases: "reviews", "ratings", "is it good", "what do people think", "feedback", "stars"`,
    component: ReviewCard,
    propsSchema: z.object({
      productId: z
        .number()
        .optional()
        .describe("ID of the product to show reviews for"),
    }),
  },
  {
    name: "PolicyCard",
    description: `Displays store policies in an expandable accordion format with FAQs.
      Covers returns, warranty, and shipping information.
      Use when the user asks about:
      - Return policy or refunds
      - Warranty coverage
      - Shipping times and costs
      - Store policies in general
      Trigger phrases: "return policy", "refund", "warranty", "shipping", "delivery", "exchange", "policy"`,
    component: PolicyCard,
    propsSchema: z.object({
      policyType: z
        .enum(["returns", "warranty", "shipping"])
        .optional()
        .describe("Specific policy to display. If not provided, shows all policies."),
    }),
  },
  {
    name: "CheckoutCard",
    description: `A checkout interface that can either add a specific product to cart
      or show the full checkout flow with cart summary and purchase button.
      Use when the user wants to:
      - Add a product to cart
      - Buy or purchase something
      - Proceed to checkout
      - Complete their order
      Trigger phrases: "add to cart", "buy", "purchase", "checkout", "order", "get this"`,
    component: CheckoutCard,
    propsSchema: z.object({
      productId: z
        .number()
        .optional()
        .describe("ID of the product to add to cart (for single product add)"),
      mode: z
        .enum(["cart", "checkout"])
        .optional()
        .describe("'cart' to add single item, 'checkout' to show full checkout flow"),
    }),
  },
  {
    name: "CartSummary",
    description: `Displays the user's shopping cart with:
      - List of all items with images, titles, prices
      - Quantity controls (add/remove)
      - Running total
      - Clear cart option
      Use when the user asks about their cart or wants to see what they've added.
      Trigger phrases: "my cart", "shopping cart", "what's in my cart", "cart items", "view cart"`,
    component: CartSummary,
    propsSchema: z.object({}),
  },
];

/**
 * Tools for Tambo (if you need server-side data fetching)
 * Currently empty as we fetch products client-side
 */
export const tools = [];