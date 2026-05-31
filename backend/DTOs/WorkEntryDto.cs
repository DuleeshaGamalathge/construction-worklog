namespace backend.DTOs;

public class WorkEntryDto
{
    public DateTime Date { get; set; }
    public string WorkType { get; set; } = string.Empty;
    public decimal Volume { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string Performer { get; set; } = string.Empty;
}