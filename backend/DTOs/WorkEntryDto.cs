namespace backend.DTOs;

using System.ComponentModel.DataAnnotations;

public class WorkEntryDto
{
    [Required]
    public DateTime Date { get; set; }

    [Required]
    [MinLength(2)]
    public string WorkType { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Volume { get; set; }

    [Required]
    public string Unit { get; set; } = string.Empty;

    [Required]
    [MinLength(3)]
    public string Performer { get; set; } = string.Empty;
}