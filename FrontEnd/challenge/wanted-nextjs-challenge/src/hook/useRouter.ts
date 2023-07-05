const useRouter = () => {
  const push = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return { push };
};

export default useRouter;
