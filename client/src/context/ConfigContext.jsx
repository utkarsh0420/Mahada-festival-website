import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await API.get("/config");
      if (res.data.success) {
        setConfig(res.data.config);
      }
    } catch (err) {
      console.error("Failed to fetch website configuration:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const updateTabs = async (tabs) => {
    try {
      const res = await API.put("/config/tabs", { tabs });
      if (res.data.success) {
        setConfig((prev) => ({
          ...prev,
          tabs: res.data.tabs
        }));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update tabs" };
    }
  };

  const updateGeneral = async (generalData) => {
    try {
      const res = await API.put("/config/general", generalData);
      if (res.data.success) {
        setConfig(res.data.config);
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Failed to update general settings" };
    }
  };

  return (
    <ConfigContext.Provider value={{ config, loading, refreshConfig: fetchConfig, updateTabs, updateGeneral }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
