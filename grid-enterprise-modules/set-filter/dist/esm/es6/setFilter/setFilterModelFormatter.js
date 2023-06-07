export class SetFilterModelFormatter {
    getModelAsString(model, setFilter) {
        const { values } = model || setFilter.getModel() || {};
        const valueModel = setFilter.getValueModel();
        if (values == null || valueModel == null) {
            return '';
        }
        const availableKeys = values.filter(v => valueModel.isKeyAvailable(v));
        const numValues = availableKeys.length;
        const formattedValues = availableKeys.slice(0, 10).map(key => setFilter.getFormattedValue(key));
        return `(${numValues}) ${formattedValues.join(',')}${numValues > 10 ? ',...' : ''}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0RmlsdGVyTW9kZWxGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2V0RmlsdGVyL3NldEZpbHRlck1vZGVsRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sT0FBTyx1QkFBdUI7SUFDekIsZ0JBQWdCLENBQUksS0FBd0MsRUFBRSxTQUF1QjtRQUN4RixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDdkQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRTdDLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFFdkMsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFaEcsT0FBTyxJQUFJLFNBQVMsS0FBSyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDeEYsQ0FBQztDQUNKIn0=