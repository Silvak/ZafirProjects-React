// vite.config.ts
import react from "file:///C:/Users/usuario/Desktop/gravitad/zafir-projects/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/usuario/Desktop/gravitad/zafir-projects/node_modules/dotenv/lib/main.js";
import * as path from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/usuario/Desktop/gravitad/zafir-projects/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/usuario/Desktop/gravitad/zafir-projects/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\usuario\\Desktop\\gravitad\\zafir-projects";
dotenv.config();
var vite_config_default = defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [
      react(),
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          "fs"
          // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true,
          // can also be 'build', 'dev', or false
          global: true,
          process: true
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true
      })
    ],
    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }
      ]
    },
    server: {
      port: 3e3,
      proxy: {
        "/server": {
          target: process.env.VITE_MORALIS_SERVER_URL,
          ws: false
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3VhcmlvXFxcXERlc2t0b3BcXFxcZ3Jhdml0YWRcXFxcemFmaXItcHJvamVjdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzdWFyaW9cXFxcRGVza3RvcFxcXFxncmF2aXRhZFxcXFx6YWZpci1wcm9qZWN0c1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXN1YXJpby9EZXNrdG9wL2dyYXZpdGFkL3phZmlyLXByb2plY3RzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtcG9seWZpbGxzJztcclxuXHJcbmRvdGVudi5jb25maWcoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuICBwcm9jZXNzLmVudiA9IHsuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKX07XHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpLFxyXG4gICAgICBub2RlUG9seWZpbGxzKHtcclxuICAgICAgICAvLyBUbyBleGNsdWRlIHNwZWNpZmljIHBvbHlmaWxscywgYWRkIHRoZW0gdG8gdGhpcyBsaXN0LlxyXG4gICAgICAgIGV4Y2x1ZGU6IFtcclxuICAgICAgICAgICdmcycsIC8vIEV4Y2x1ZGVzIHRoZSBwb2x5ZmlsbCBmb3IgYGZzYCBhbmQgYG5vZGU6ZnNgLlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBzcGVjaWZpYyBnbG9iYWxzLlxyXG4gICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgIEJ1ZmZlcjogdHJ1ZSwgLy8gY2FuIGFsc28gYmUgJ2J1aWxkJywgJ2RldicsIG9yIGZhbHNlXHJcbiAgICAgICAgICBnbG9iYWw6IHRydWUsXHJcbiAgICAgICAgICBwcm9jZXNzOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gV2hldGhlciB0byBwb2x5ZmlsbCBgbm9kZTpgIHByb3RvY29sIGltcG9ydHMuXHJcbiAgICAgICAgcHJvdG9jb2xJbXBvcnRzOiB0cnVlLFxyXG4gICAgICB9KSxdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczogW1xyXG4gICAgICAgIHsgZmluZDogJ0AnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDAsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9zZXJ2ZXInOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IHByb2Nlc3MuZW52LlZJVEVfTU9SQUxJU19TRVJWRVJfVVJMLFxyXG4gICAgICAgICAgd3M6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThVLE9BQU8sV0FBVztBQUNoVyxPQUFPLFlBQVk7QUFDbkIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLFNBQVMscUJBQXFCO0FBSjlCLElBQU0sbUNBQW1DO0FBTXpDLE9BQU8sT0FBTztBQUVkLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsVUFBUSxNQUFNLEVBQUMsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBQztBQUM5RCxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFBQyxNQUFNO0FBQUEsTUFDZCxjQUFjO0FBQUE7QUFBQSxRQUVaLFNBQVM7QUFBQSxVQUNQO0FBQUE7QUFBQSxRQUNGO0FBQUE7QUFBQSxRQUVBLFNBQVM7QUFBQSxVQUNQLFFBQVE7QUFBQTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1g7QUFBQTtBQUFBLFFBRUEsaUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUFBLElBQUU7QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEVBQUUsTUFBTSxLQUFLLGFBQWtCLGFBQVEsa0NBQVcsS0FBSyxFQUFFO0FBQUEsTUFDM0Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxXQUFXO0FBQUEsVUFDVCxRQUFRLFFBQVEsSUFBSTtBQUFBLFVBQ3BCLElBQUk7QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
