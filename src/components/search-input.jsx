"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SearchInputContext = React.createContext();

const SearchInput = React.forwardRef(
  ({ className, children, onSearch, ...props }, ref) => {
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
      onSearch(value);
    }, [value, onSearch]);

    return (
      <SearchInputContext.Provider value={{ value, setValue }}>
        <div className={cn("relative", className)} {...props} ref={ref}>
          {children}
        </div>
      </SearchInputContext.Provider>
    );
  }
);
SearchInput.displayName = "SearchInput";

const SearchInputField = React.forwardRef(({ className, ...props }, ref) => {
  const { value, setValue } = React.useContext(SearchInputContext);

  return (
    <Input
      type="search"
      className={cn("pl-8", className)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      ref={ref}
      {...props}
    />
  );
});
SearchInputField.displayName = "SearchInputField";

const SearchInputIcon = ({ className, icon: Icon = Search, ...props }) => {
  return (
    <Icon
      className={cn(
        "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};

SearchInput.Field = SearchInputField;
SearchInput.Icon = SearchInputIcon;

export { SearchInput };
